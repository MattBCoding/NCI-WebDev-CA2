# Branch Name Rules

To keep things simple to track, we should follow a format for branch names
I suggest we use name followed by page followed by feature name. We don't want the branch names getting too long so keep them as short as possible, but enough so you know which branch holds what changes just by the name.
e.g.
```
Matt-Home-image-carousel
Matt-Contact-form-validation
```

## Branch Rules
1. Do not push to the main branch
2. Follow the naming format
3. Only use one branch at a time - checkout a branch, do the work, push the changes and create the PR. Then switch back to main and start the next task on a fresh branch.

## Errors
I have setup a rule on the repo to reject any push to the main branch. This may sound like i'm just being difficult but believe me it is much better than you having to wait for me to fix merge conflicts before you can do any work on the project. If you do it by mistake, you will get the following error message:
```
To github.com:MattBCoding/NCI-WebDev-CA2.git
 ! [remote rejected] main -> main (push declined due to repository rule violations)
error: failed to push some refs to 'github.com:MattBCoding/NCI-WebDev-CA2.git'
```

If this happens, don't panic, we just need to move the changes to a branch, and push them from there.
1. Create and switch to a new branch
Because you are on the main branch, with your commits, you can create a branch from there that will inherit the history and your commits
```
git switch -c your-new-branch-name
```
2. Push the new branch
Now you can push your branch up to GitHub and go open a pull request
```
git push
```
or 
```
git push -u origin your-new-branch-name
```
3. Clean up your main branch
Your local main branch will still have your commits on it, and it is now out of sync with the remote main branch so we need to clean it up. To do this we are going to reset it.
```
git switch main
git reset --hard origin/main
```
This will remove all changes on your main branch and reset it back to the same as the remote main branch. It is permanent so any changes that you have on this branch locally will be lost forever.