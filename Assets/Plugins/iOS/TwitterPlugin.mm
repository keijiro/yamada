#import <Foundation/Foundation.h>
#import <Twitter/TWTweetComposeViewController.h>

extern UIViewController *UnityGetGLViewController();

#pragma mark Plug-in Function

extern "C" bool _TwitterIsAvailable() {
    if (NSClassFromString(@"TWRequest") != nil) {
        return [TWTweetComposeViewController canSendTweet] == YES;
    } else {
        return false;
    }
}

extern "C" void _TwitterComposeTweet(const char *initialText, const char *url, const char *screenshotPath) {
    UIViewController *rootViewController = UnityGetGLViewController();
    
    TWTweetComposeViewController* controller = [[TWTweetComposeViewController alloc] init];
    
    if (initialText != nil) {
        [controller setInitialText:[NSString stringWithUTF8String:initialText]];
    }

    if (screenshotPath != nil) {
        UIImage *image = [UIImage imageWithContentsOfFile:[NSString stringWithUTF8String:screenshotPath]];
        [controller addImage:image];
    }

    if (url != nil) [controller addURL:[NSURL URLWithString:[NSString stringWithUTF8String:url]]];
    
    controller.completionHandler = ^(TWTweetComposeViewControllerResult result) {
        [rootViewController dismissModalViewControllerAnimated:YES];
    };
    
    [rootViewController presentModalViewController:controller animated:YES];
    [controller release];
}
