---
layout: page
title: Fuzzy search
menuOrder: 3
---
If you take a look at [Cheat Sheet](/cheat-sheet/), you’ll find that there are too many CSS snippets to remember. Also, some of them might be a bit lengthy for sake of logical separation.

To make CSS writing a bit easier, Emmet implement _fuzzy search_ logic for CSS snippets: every time you enter unknown abbreviation, Emmet will try to find a closest snippet definition.

For example, instead of writing `ov:h` (`overflow: hidden;`) abbreviation, you can write `ov-h`, `ovh` or even `oh`. You can play around with the fuzzy search in text editor below. Try to find as many variations as possible (use Tab key to expand abbreviations) for `bxz:cb`, `ovx:h` and `pos:a` snippets.

<textarea class="cm-box" data-height="150" data-cm-mode="text/css"></textarea>

The fuzzy search is performed against _predefined snippet names_, not snippet values or CSS properties. This results in more predictable and controllable matches. Remember that you can always [create your own snippets or redefine existing ones](/customization/) to fine-tune fuzzy search experience.