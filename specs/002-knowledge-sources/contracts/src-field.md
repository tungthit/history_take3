# Contract: the `src` field

## Shape

```js
src: 'https://www.nobelprize.org/prizes/medicine/1945/summary/'
src: ['https://whc.unesco.org/en/list/208/', 'https://en.wikipedia.org/wiki/Buddhas_of_Bamiyan']
src: 'The Rhind Mathematical Papyrus, British Museum, EA 10057'
src: 'milestone'   // captions only
```

- Last field of the entry object, on the same line as the entry for history events.
- A string, or an array of 1-3 strings, single-quoted like the rest of the data.

## Each string is one of

| Form | Rule |
|---|---|
| URL | starts with `https://`; no tracking parameters; a stable page (an article, a record, a DOI link `https://doi.org/...`) |
| Citation | at least a title and an author or publisher, separated by commas; a year or catalogue number if known; findable without a link |
| `'milestone'` | captions only; means the milestone's `src` confirms every fact in the caption |

## Priority (research.md, Decision 3)

1. Official or primary body, or the original publication.
2. Scholarly reference.
3. Wikipedia, English edition first.

When the first source found is Wikipedia and a source of kind 1 or 2 exists, the array form lists the better
source first.

## Not allowed

- Search result pages, social media posts, AI-generated pages, shortened links.
- A source that does not mention the event, person or discovery.
- Leaving `src` empty or `''`.
