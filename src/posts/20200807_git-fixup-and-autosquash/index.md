---
title: "Git Fixup and Autosquash"
tags:
  - git
date: "2020-08-07T04:01:00.000Z"
---

Maintaining a clean git history brings me a lot of joy. That's because sometimes it's extremely difficult to make happen all the time when I'm constantly going back, seeing a small mistake, and need to make a teeny edit.

Say I make a commit to update a component, and it's all good. Then I realize I left a debugging `console.log()` in, failing to make the perfect commit.

Enter `git commit --fixup` and `git rebase -i --autosquash`. Used together, they make a worthy pair in helping me clean up my git history. The original post is [here](https://fle.github.io/git-tip-keep-your-branch-clean-with-fixup-and-autosquash.html).

**Note: although this is cleaning the git log, it is rewriting history, so use with caution, especially when collaborating with others. Conflicts may occur.**

Here is my example:

```
$ git log --oneline
```

```
cd3fb6 Update component
ba83fe Previous commit
```

Now I make my change, that is, deleting the sray `console.log()` from my code.

Then I create the commit:

```
git commit --fixup cd3fb6
```

See how I pass in the commit hash for the commit I want to combine this with? I want the `console.log()` removal together with the `Update component` commit. To me, there is no point in having it as a separate commit.

Now there is a new commit after I check the git log.

```
d294ae !fixup Update component
cd3fb6 Update component
ba83fe Previous commit
```

The latest commit has the prefix `!fixup`, which will be read in by the next git command, `git rebase`.

Using the `--autosquash` argument, the rebase will go through, find the prefix `!fixup` and assign it with the `fixup` type automatically.

So here we go, passing in the commit hash for the change prior to the commit I want combined (the one for `Previous commit`).

```
git rebase -i --autosquash ba83fe
```

Using `-i` is the interactive mode, so I can see exactly what is going on before going through with the rebase.

When it's all good, I save and quit, and then check the log:

```
9282ca Update component
ba83fe Previous commit
```

Now the commits are combined into one, with a new hash!

Git documentation:
- [git commit --fixup](https://git-scm.com/docs/git-commit#Documentation/git-commit.txt---fixupltcommitgt)
- [git rebase --autosquash](https://git-scm.com/docs/git-rebase#Documentation/git-rebase.txt---autosquash)