/**
@license
Copyright 2017 The Advanced REST client authors <arc@mulesoft.com>
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
import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import {EventsTargetMixin} from '../../@advanced-rest-client/events-target-mixin/events-target-mixin.js';
import {HttpMethodSelectorMixin} from './http-method-selector-mixin.js';
import '../../@polymer/paper-dropdown-menu/paper-dropdown-menu.js';
import '../../@polymer/paper-listbox/paper-listbox.js';
import '../../@polymer/paper-item/paper-item.js';
import '../../@polymer/paper-input/paper-input.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
/**
 * A HTTP method selector in a dropdown list of predefined HTTP methods.
 *
 * ### Example
 *
 * ```html
 * <http-method-selector-mini></http-method-selector-mini>
 * ```
 *
 * ### Styling
 *
 * `<http-method-selector>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--http-method-selector-mini` | Mixin applied to the element | `{}`
 * `--http-method-selector-mini-dropdown-width` | Width of the dropdown field | `100px`
 * `--http-method-selector-mini-input-width` | Width of the custom input field | `100px`
 * `--http-method-selector-mini-dropdown` | Mixin applied to the dropdown field | `{}`
 * `--http-method-selector-mini-input` | Mixin applied to the custom input field | `{}`
 * `--http-method-selector-custom-close-button` | Mixin applied to the custom input close button | `{}`
 * `--from-row-action-icon-color` | Theme variable, color of the custom input close button | `--icon-button-color` or `rgba(0, 0, 0, 0.74)`
 * `--from-row-action-icon-color-hover` | Theme variable, color of the custom input close button when hovering | `--accent-color` or `rgba(0, 0, 0, 0.74)`
 *
 * @customElement
 * @polymer
 * demo/mini.html
 * @memberof UiElements
 * @appliesMixin ArcBehaviors.EventsTargetBehavior
 * @appliesMixin ArcBehaviors.HttpMethodSelectorMixin
 */
class HttpMethodSelectorMini extends HttpMethodSelectorMixin(EventsTargetMixin(PolymerElement)) {
  static get template() {
    return html`
    <style>
    :host {
      display: block;
      @apply --http-method-selector-mini;
    }

    paper-dropdown-menu {
      width: var(--http-method-selector-mini-dropdown-width, 100px);
      @apply --http-method-selector-mini-dropdown;
    }

    .custom-name {
      display: inline-block;
      width: var(--http-method-selector-mini-input-width, 100px);
      @apply --http-method-selector-mini-input;
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
    <paper-dropdown-menu label="Method" opened="{{methodMenuOpened}}"
      hidden\$="[[renderCustom]]" disabled="[[readonly]]">
      <paper-listbox slot="dropdown-content" selected="{{method}}" attr-for-selected="data-method">
        <paper-item data-method="GET">GET</paper-item>
        <paper-item data-method="POST">POST</paper-item>
        <paper-item data-method="PUT">PUT</paper-item>
        <paper-item data-method="DELETE">DELETE</paper-item>
        <paper-item data-method="PATCH">PATCH</paper-item>
        <paper-item data-method="HEAD">HEAD</paper-item>
        <paper-item data-method="CONNECT">CONNECT</paper-item>
        <paper-item data-method="OPTIONS">OPTIONS</paper-item>
        <paper-item data-method="TRACE">TRACE</paper-item>
        <paper-item data-method="">Custom</paper-item>
      </paper-listbox>
    </paper-dropdown-menu>
    <template is="dom-if" if="[[renderCustom]]">
      <paper-input class="custom-name" label="Method" required="" auto-validate=""
        inline="" value="{{method}}" no-label-float="" readonly="[[readonly]]">
        <paper-icon-button slot="suffix" icon="arc:close" on-click="closeCustom"
          title="Clear and opend standard dropdown"></paper-icon-button>
      </paper-input>
    </template>
`;
  }
}
window.customElements.define('http-method-selector-mini', HttpMethodSelectorMini);
