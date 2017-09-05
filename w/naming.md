# Naming Guide

By [Trevor J Hoglund](http://trevorjhoglund.com) for [Phene.co](http://phene.co).

## Purpose

This document is written to clearly describe consistent rules for naming CSS selectors across all Phene.co projects.
Such consistency is necessary to allow any person working on one project to easily be able to pick up on another project without the requirement of learning new standards for selectors.
This is merely a styleguide and not a rulebook, modifications can be made per project and should be noted within the appropriate documentation.
Do not be afraid to break these rules if you truly believe it is necessary.

## Inspiration and References

As with the CSS Guide, a lot of this section is inspired by [18F's Front End Guide](https://pages.18f.gov/frontend/) which describes a modified version of [BEM](https://en.bem.info/methodology/naming-convention/) for naming.
The naming scheme here, however, is styled more similarly to [SMACSS](https://smacss.com/), but retains a structure much akin to BEM.

## Methodology

The base concept and origin of the name in BEM is to format selectors in the order of Block Element Modifier,
wherein a block is "a functionally independent page component that can be reused",
an element is "a composite part of a block that can't be used separately from it",
and a modifier is "an entity that defines the appearance, state, or behavior of a block or element".
As an alternative to blocks, this guide will describe a Model-Implementation system.
Where blocks would simply state that an element is a block of type `.post`,
this system would go further and say that an element is a card that takes the form of a post, e.g. `.card.post`.
This could be effectively described as a **Model-Implementation Element Modifier (MIEM)** naming scheme.

### Models

The model is the most basic component of what defines an element.
It is, in essence, the form that the element takes.
This is in part inspired by [Google's Material Design](https://material.io/guidelines/) in which there are a relatively few categories for a containing material to fall under:

- Card

- Drawer

- Floating Action Button (FAB)

To expand on this, there is also a list of models (which are referred to as components) starting with [Bottom Navigation](https://material.io/guidelines/components/bottom-navigation.html#bottom-navigation-usage) in said docs.
Guidelines for models:

- Models are not inheritted by elements that they contain.

- Models are defined in the DOM by the `class` attribute on elements.

- Models define the type of component an element is.

- Some elements may be declared without a model. This is mainly reserved for paragraphs and other miscellanious elements.


### Implementations

An implementation of a model is an instance of a component that could be categorized as said model.
Implementations are semantically close to the blocks defined in BEM.
Guidelines for implementations:

- Implementation names should describe what the object is and how it acts rather than the appearance of the object.

- Implementations can be nested.

- Implementations are defined in the DOM by the `class` attribute on elements.

Some good and bad examples of the Model-Implementation system written in Pug (fka Jade):

```jade
// Good
div.card.post
	h3.heading.post-header This is a header.
	p.post-text This is some copy.
	
// Bad, describes appearance
div.card.red-box

// Good, nesting
div.drawer.header
	div.heading.header-heading Welcome to my site!
	form.search-form

// Bad, uses ID to define implementation
div.drawer#heading
	div.heading.header-heading Welcome!
```