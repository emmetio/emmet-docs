---
layout: page
title: "preferences.json"
menuOrder: 2
---
The `preferences.json` file is used to modify behavior of some actions and resolvers of Emmet. This file contains a simple dictionary of key–value pairs.

For example, on “[CSS Gradients](/css-abbreviations/gradients/)” there’s description of `css.gradient.fallback` option which enables fallback `background-color` value when definition is expanded. To enable it, simply add this key to `preferences.json` file:

    {
        "css.gradient.fallback": true
    }

Here’s a list of currently available options:

<div class="emmet-preferences"></div>
