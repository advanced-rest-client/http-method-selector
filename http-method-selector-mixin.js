/**
@license
Copyright 2018 The Advanced REST client authors <arc@mulesoft.com>
Licensed under the Apache License, Version 2.0 (the "License"); you may not
use this file except in compliance with the License. You may obtain a copy of
the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations under
the License.
*/
import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';

/**
 * A behavior to share common code between both method selectors.
 *
 * @polymer
 * @mixinFunction
 * @memberof ArcMixins
 */
export const HttpMethodSelectorMixin = dedupingMixin((base) => {
  /**
   * @polymer
   * @mixinClass
   */
  class HMSMmixin extends base {
    static get properties() {
      return {
        // Currently selected HTTP method
        method: {
          type: String,
          value: 'GET',
          notify: true,
          observer: '_methodChanged'
        },

        /**
         * True if the request for selected HTTP method can carry a payload. It
         * is defined in HTTP spec.
         */
        isPayload: {
          type: Boolean,
          value: false,
          readOnly: true,
          notify: true,
          computed: '_computeIsPayload(method)',
          observer: '_onIsPayloadChanged'
        },
        // Set to true when the user opens the dropdown menu
        methodMenuOpened: {
          type: Boolean,
          value: false
        },
        /**
         * When set it allows to render a custom method selector
         */
        renderCustom: {
          type: Boolean,
          value: false,
          notify: true
        },
        /**
         * When set the editor is in read only mode.
         */
        readonly: Boolean
      };
    }

    constructor() {
      super();
      this._isPayloadStatusHandler = this._isPayloadStatusHandler.bind(this);
      this._methodChangedHandler = this._methodChangedHandler.bind(this);
    }

    static get observers() {
      return [
        '_dropdownMenuOpened(methodMenuOpened, method)'
      ];
    }

    get standardMethods() {
      return [
        'get', 'post', 'put', 'delete', 'patch', 'head', 'connect',
        'options', 'trace'
      ];
    }

    _attachListeners(node) {
      node.addEventListener('request-is-payload-status', this._isPayloadStatusHandler);
      node.addEventListener('request-method-changed', this._methodChangedHandler);
    }

    _detachListeners(node) {
      node.removeEventListener('request-is-payload-status', this._isPayloadStatusHandler);
      node.removeEventListener('request-method-changed', this._methodChangedHandler);
    }

    // Compute if the tayload can carry a payload.
    _computeIsPayload(method) {
      return ['GET', 'HEAD'].indexOf(method) === -1;
    }

    // Handler for `isPayload` property change
    _onIsPayloadChanged(value) {
      if (value === undefined) {
        return;
      }
      this.dispatchEvent(new CustomEvent('request-is-payload-changed', {
        cancelable: true,
        bubbles: true,
        composed: true,
        detail: {
          value: value
        }
      }));
    }
    // Handler for `method` property chnage
    _methodChanged(method) {
      if (method === undefined || this.__cancelMethodEvent) {
        return;
      }
      if (method && !this.renderCustom) {
        let m = method && method.toLowerCase();
        m = m.trim();
        if (m) {
          if (this.standardMethods.indexOf(m) === -1) {
            this.renderCustom = true;
          }
        }
      }
      this.dispatchEvent(new CustomEvent('request-method-changed', {
        cancelable: true,
        bubbles: true,
        composed: true,
        detail: {
          value: method
        }
      }));
    }
    /**
     * Responds to an event requesting status check for `isPayload` propery by setting the `value`
     * property on the event and canceling the event.
     *
     * @param {CustomEvent} e
     */
    _isPayloadStatusHandler(e) {
      if (e.defaultPrevented) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      e.detail.value = this.isPayload;
    }
    /**
     * If the event source is not this element it will update the method value.
     *
     * @param {CustomEvent} e
     */
    _methodChangedHandler(e) {
      if (e.target === this) {
        return;
      }
      this.__cancelMethodEvent = true;
      this.set('method', e.detail.value);
      this.__cancelMethodEvent = undefined;
    }

    closeCustom() {
      this.renderCustom = false;
      this.set('method', 'GET');
    }

    /**
     * Checks if there is an empty method name and if it is it will set `renderCustom` property
     * that constrolls display of a custom method input.
     *
     * @param {Boolean} opened
     * @param {String} method
     */
    _dropdownMenuOpened(opened, method) {
      if (!opened && method === '' && !this.renderCustom) {
        this.renderCustom = true;
        afterNextRender(this, () => {
          this.shadowRoot.querySelector('paper-input').focus();
        });
      }
    }
  }

  /**
   * Fired when the `isPayload` computed property value chnage.
   *
   * @event request-is-payload-changed
   * @param {Boolean} value Current state.
   */
  /**
   * Fired when a method has been selected.
   *
   * @event request-method-changed
   * @param {Boolean} value Current HTTP method name.
   */
  return HMSMmixin;
});
