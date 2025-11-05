# Spec: Add Material Design

This document outlines the technical specifications for integrating Google Material Design into the extension.

## 1. Include Material Design Assets

We will use the Material Design web components from a CDN. The following files will be included in the `<head>` of the HTML pages:

- **CSS:** `https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css`
- **JavaScript:** `https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js`

These will be added to `optPageHello.html` and `popup.html`.

## 2. Update HTML Structure

The existing HTML content will be updated to use Material Design components.

### 2.1. optPageHello.html

- The main container will be a Material Design Card (`mdc-card`).
- The title will be styled using Material Design Typography.
- Buttons will be replaced with Material Design Buttons (`mdc-button`).

### 2.2. popup.html

- The popup will be styled as a Material Design Card (`mdc-card`).
- Interactive elements will be replaced with Material Design components (e.g., buttons, lists).

## 3. Verification

- After the changes are implemented, a visual inspection of `optPageHello.html` and `popup.html` will be performed to ensure the Material Design components are rendered correctly.
- The functionality of the pages will be tested to ensure that the new components have not introduced any regressions.