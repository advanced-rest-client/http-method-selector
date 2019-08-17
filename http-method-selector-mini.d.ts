/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   http-method-selector-mini.js
 */


// tslint:disable:variable-name Describing an API that's defined elsewhere.
// tslint:disable:no-any describes the API as best we are able today

import {html, css, LitElement} from 'lit-element';

import {EventsTargetMixin} from '@advanced-rest-client/events-target-mixin/events-target-mixin.js';

import {HttpMethodSelectorMixin} from './http-method-selector-mixin.js';

declare namespace UiElements {

  /**
   * A HTTP method selector in a dropdown list of predefined HTTP methods.
   *
   * ### Example
   *
   * ```html
   * <http-method-selector-mini></http-method-selector-mini>
   * ```
   */
  class HttpMethodSelectorMini extends
    ArcBehaviors.EventsTargetBehavior(
    ArcBehaviors.HttpMethodSelectorMixin(
    Object)) {
    render(): any;
  }
}

declare global {

  interface HTMLElementTagNameMap {
    "http-method-selector-mini": UiElements.HttpMethodSelectorMini;
  }
}
