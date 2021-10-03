# Bugs
1. Handle errors when entering incorrect regular expression errors in the search box.

# Features

## General
3. i18n
1. Option to copy only references from the search results.
1. Option to include words highlighting in the verses using markdown or HTML format.
1. Highlighting the lookup in the search primary color with continuous layout?
1. Defining the scope of the search, in which books, old/new testament.
1. Edit the list of search results by adding and removing verses from it
1. Mouse free operating, configurable keyboard shortcuts

## Server side services
10. Comparison of a passage in different translations. Service more suitable than fetching multiple translations at one to the client and than comparing them.
1. Deal with slow connection, don't fetch entire Bible if connection is slow, option to cancel translation change and go back to previous translation. Would require creating a server side service to do the processing and get the results only to limit the network throughput.
1. Search by all grammatical forms of the given form - make a web service with a grammar dictionary (if there is no such dictionary) and replace the returned list of forms with a regular expression of the type /forma1|forma2|.../gi and search
1. Search by synonyms, very powerful cutting edge feature enabling comprehensive insight into Bible
1. Automatic reading of selected verses or the whole chapter currently displayed <scrip src = "https://code.responsivevoice.org/responsivevoice.js?key=q6z8KdWa"/>

## Translations
15. Configuration of translations. Title, shortcut to formatting, list of full and short names of books and their order. Handle variations in the division into chapters and verse numbering in various translations. Could be done in a way similar to MyBible. Other resource to look to is BCV Parser's meta data about various translations.
2. Ability to upload a translation by a user, in order no to limit the users in what translations they can use but avoiding responsibility of breaking the copyright laws. 
3. More checks on the correctness of the text of individual translations. For example empty verses, not continuous verses numbering, punctuation mistakes, etc. 

## Settings
18. Select a book naming standard from the list. Create custom standard for naming books and add it to the list.
2. Create verse formatting templates by clicking on some options alternatively to typing codes for placeholders. For example, reference placement: front/end, include verse numbers: checkbox, each verse from new line: checkbox, new line between reference and the passage content: checkbox, include translation symbol: yes/no, etc.
3. Have predefined verse formatting templates to select from.
3. Allow enlarging and decreasing of the font size and changing the primary font color.
4. Setting of custom css rules, e.g. own style to highlight search phrases in the text, loading css dynamically. 

## Aesthetics
23. More original and professional app icon (mostly favicon)

## Utilities to work with the text content
24. Favorite verses
2. Coloring verses
3. Hash tagging of verses
4. Custom translations of verses
5. Own commentaries on verses
6. References to other verses
7. Show Hebrew/Greek words of the given verse using blueletterbible.org translated automatically to user language.

## Community
31. Track commentary on verses by denominations, within a selected community, or by individuals
2. Community translation, voting of the translation of individual verses (very vague and questionable idea at the moment)

## Technical
33. Responsive toolbar - move the last icons to "more" menu automatically if there is no space for some of them.
2. Migrate to Quasar 2.
3. Test on different browsers and systems. 
4. Create version optimized for mobile.
4. Option to store bible translations locally for desktop and mobile apps.
5. REST API - JSON service returning the fragment text after providing the request with the passage reference.
6. Wordpress plugin - a biblical link with a tooltip showing the content of the fragment.
