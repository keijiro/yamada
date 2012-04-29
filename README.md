### Steps to deplay (iOS)

- Build Xcode project, and open it.
- Go to "Summary" tab.
- Set a version number.
- Add Twitter.framework to "Linked Frameworks and Libraries".
- Go to "Info" tab.
- Create "Localizations" setting and add "Japanese".
- Open AppController.mm
- Comment out this code block.

```objective-c
/*
[_displayLink setPaused: YES];
while (CFRunLoopRunInMode(kCFRunLoopDefaultMode, kInputProcessingTime, TRUE) == kCFRunLoopRunHandledSource)
        ;
[_displayLink setPaused: NO];
*/
```

- Ship it!
