### Steps to deplay (iOS)

1. Build Xcode project, and open it.
2. Go to "Summary" tab.
2. Set a version number.
3. Add Twitter.framework to "Linked Frameworks and Libraries".
4. Go to "Info" tab.
5. Create "Localizations" setting and add "Japanese".
6. Open AppController.mm
7. Comment out this code block.

	/*
	[_displayLink setPaused: YES];
	
	while (CFRunLoopRunInMode(kCFRunLoopDefaultMode, kInputProcessingTime, TRUE) == kCFRunLoopRunHandledSource)
			;
	
	[_displayLink setPaused: NO];
	*/

8. Ship it!
