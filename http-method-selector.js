/**
@license
Copyright 2016 The Advanced REST client authors <arc@mulesoft.com>
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
import {PolymerElement} from '@polymer/polymer/polymer-element.js';
import {EventsTargetMixin} from '@advanced-rest-client/events-target-mixin/events-target-mixin.js';
import {html} from '@polymer/polymer/lib/utils/html-tag.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '@polymer/paper-listbox/paper-listbox.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@advanced-rest-client/arc-icons/arc-icons.js';
import {HttpMethodSelectorMixin} from './http-method-selector-mixin.js';

/**
 * A HTTP method selector. Displays list of radio buttons with common
 * http methods and a dropdown with less common but still valid methods.
 *
 * User can define his own methos whe selects "custom" option in the dropdown menu.
 * Because of this the element do not support validation of any kind and hosting
 * application should provide one if required.
 *
 * ### Example
 *
 * ```html
 * <http-method-selector></http-method-selector>
 * ```
 *
 * ### Styling
 * `<http-method-selector>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--http-method-selector` | Mixin applied to the element | `{}`
 * `--http-method-selector-dropdown` | Mixin applied to the dropdown field | `{}`
 * `--http-method-selector-input` | Mixin applied to the custom input field | `{}`
 * `--http-method-selector-custom-close-button` | Mixin applied to the custom input close button | `{}`
 * `--from-row-action-icon-color` | Theme variable, color of the custom input close button | `--icon-button-color` or `rgba(0, 0, 0, 0.74)`
 * `--from-row-action-icon-color-hover` | Theme variable, color of the custom input close button when hovering | `--accent-color` or `rgba(0, 0, 0, 0.74)`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof UiElements
 * @appliesMixin EventsTargetMixin
 * @appliesMixin HttpMethodSelectorMixin
 */
class HttpMethodSelector extends HttpMethodSelectorMixin(EventsTargetMixin(PolymerElement)) {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      @apply --http-method-selector;
    }

    :host > * {
      vertical-align: middle;
    }

    paper-dropdown-menu {
      margin-left: 16px;
      @apply --http-method-selector-dropdown;
    }

    .custom-name {
      display: inline-block;
      margin-left: 16px;
      @apply --http-method-selector-input;
    }

    #closeCustom {
      padding: 0;
      width: 24px;
      height: 24px;
      color: var(--from-row-action-icon-color, var(--icon-button-color, rgba(0, 0, 0, 0.74)));
      transition: color 0.2s linear;
      @apply --http-method-selector-custom-close-button;
    }

    #closeCustom:hover {
      color: var(--from-row-action-icon-color-hover, var(--accent-color, rgba(0, 0, 0, 0.74)));
    }

    [hidden] {
      display: none !important;
    }
    </style>
    <paper-radio-group selected="{{method}}">
      <paper-radio-button disabled="[[readonly]]" name="GET">GET</paper-radio-button>
      <paper-radio-button disabled="[[readonly]]" name="POST">POST</paper-radio-button>
      <paper-radio-button disabled="[[readonly]]" name="PUT">PUT</paper-radio-button>
      <paper-radio-button disabled="[[readonly]]" name="DELETE">DELETE</paper-radio-button>
      <paper-radio-button disabled="[[readonly]]" name="PATCH">PATCH</paper-radio-button>
    </paper-radio-group>
    <paper-dropdown-menu label="Other methods" opened="{{methodMenuOpened}}"
      hidden\$="[[renderCustom]]" disabled="[[readonly]]" no-label-float="">
      <paper-listbox slot="dropdown-content" selected="{{method}}" attr-for-selected="data-method">
        <paper-item data-method="HEAD">HEAD</paper-item>
        <paper-item data-method="CONNECT">CONNECT</paper-item>
        <paper-item data-method="OPTIONS">OPTIONS</paper-item>
        <paper-item data-method="TRACE">TRACE</paper-item>
        <paper-item data-method="">custom</paper-item>
      </paper-listbox>
    </paper-dropdown-menu>
    <template is="dom-if" if="[[renderCustom]]">
      <paper-input class="custom-name" label="Custom method" required=""
        auto-validate="" inline="" value="{{method}}" disabled="[[readonly]]" no-label-float="">
        <paper-icon-button title="Clear and close custom editor" slot="suffix"
          icon="arc:close" on-click="closeCustom"></paper-icon-button>
      </paper-input>
    </template>
`;
  }
}
window.customElements.define('http-method-selector', HttpMethodSelector);
