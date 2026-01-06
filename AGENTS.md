# Agent Guidelines for sk-personal-website

## Red flags in a React codebase

🚩 functions like <button onClick={handleClick}
or handleSubmit

- handleClick / handleSubmit doesn't explain what it does
- you lose colocation
- need new names for each callback

Inline callbacks can call multiple functions with good names

onClick={() => {
analytics.event('this-button')
openModal()

🚩 useMemo

React devs are terrified of renders and often overuseMemo

- memoize things that you pass as props to components that may have expensive children
- it's ok for leaf components to over-render

useMemo does not fix bugs, it just makes them happen less often

React Compiler will automatically handle memoization when enabled, making manual useMemo less necessary.

🚩 <div onClick

divs are not interactive elements and adding onClick requires implementing keyboard control, screen reader announcement, etc

This is almost never the right move, and anyone capable of doing it right (the new tweet button) isn't going to be swayed by this prompt anyways

🚩 preventDefault

This is javascript and only runs once javascript loads. if you click a link / submit a form before that, preventDefault will not run. It's a necessary tool for progressive enhancement, but this flag should make you look closer for unexpected behavior

🚩 fetch inside useEffect

React code requires fetch to be in useEffect, but most things should use TanstackQuery or other provider instead.

- the effect runs more often than you think
- attempts to hook into the fetch lifecycle are usually buggy

🚩 unecessary useEffects

[https://react.dev/learn/you-might-not-need-an-effect] Read this article. You might not need an effect, so don't use it if you don't need it.

🚩 a "hooks" directory

A context provider and its useContext hook belog together, not split up into components and hooks directories
Sorting your codebase by what each function looks like means small changes will span many directories.

<!--
Ignored rules:

🚩 css files

One CSS file for global styling (ex. when using shadcn/ui) is fine. If you need more CSS files, that's the red flag.

-->