---
title: Strictly null in TypeScript
date: '2020-04-08T14:34:00Z'
description: 'Setting that strict flag'
---

Recently I read a discussion about the following code:

```typescript
let legal: HTMLElement | null = document.querySelector('footer .legal')

export const addFooter = () => {
  let legal = document.querySelector('footer .legal')
  if (!legal) return
  legal.insertAdjacentElement('beforebegin', $(LEGAL))
  ;(<HTMLElement>legal).style.marginTop = '0px'
}
```

https://dev.to/briwa/how-strict-is-typescript-s-strict-mode-311a

https://www.typescriptlang.org/docs/handbook/compiler-options.html

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-3.html#new---strict-master-option

New checks added to TypeScript are often off by default to avoid breaking existing projects. While avoiding breakage is a good thing, this strategy has the drawback of making it increasingly complex to choose the highest level of type safety, and doing so requires explicit opt-in action on every TypeScript release. With the --strict option it becomes possible to choose maximum type safety with the understanding that additional errors might be reported by newer versions of the compiler as improved type checking features are added.

The new --strict compiler option represents the recommended setting of a number of type checking options.

strict' compiler option and its default:

This option, by default, is set to false with a very good reason: to make it easier to get started with TypeScript. The option will turn on all strict type checks, which currently includes:

> As noted, it is the default under `tsc --init`.
>
> One of the reasons we don't adhere to semver is that we _don't_ make giant boil-the-ocean breaking changes between any two versions - our policy is that you should feel safe upgrading from one TS version to the next and only get a handful of new warnings that should be mostly useful. There's a 0% chance turning on `strict` in an existing codebase won't generate a huge number of warnings. And this is all to say nothing of the fact that a large proportion of DefinitelyTyped definitions aren't yet updated for `strictNullChecks` compliance, so any given codebase's _ability_ to turn on all of `strict` is kind of in the air.
>
> If people _want_ `strict` on, it's usually trivial to do so, and we encourage them to do so with `tsc --init`. If they want their build to keep working on upgrade, we'd really like to help them with that. Throwing up a giant wall of errors (which won't have any clear explanation as to why they're suddenly appearing!) on the next TypeScript upgrade is not going to change anyone's mind about the relative usefulness of `strict` in a positive way.
>
> [@RyanCavanaugh][github-ryan-cavanaugh], commented on [8 Jun 2018][github-comment]

--noImplicitAny, --noImplicitThis, --alwaysStrict, --strictBindCallApply, --strictNullChecks, --strictFunctionTypes and --strictPropertyInitialization.

This also means that if you use the --strict flag (or compiler option), that a build that was working can "suddenly break" when typescript is updated. For this reason, it is possible to manually list out all the checks and it's another reason why strict is not on by default.

DJ's opinion: always turn on strict if you're going to be actively developing something in or with typescript. When it becomes a maintenance-only project, you can grab the flags from that moment and replace strict with the individual flags, allowing you to upgrade typescript as you go.

[github-comment]: https://github.com/Microsoft/TypeScript/issues/24773#issuecomment-395797268
[github-ryan-cavanaugh]: RyanCavanaugh
