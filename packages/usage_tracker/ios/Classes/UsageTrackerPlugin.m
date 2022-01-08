#import "UsageTrackerPlugin.h"
#if __has_include(<usage_tracker/usage_tracker-Swift.h>)
#import <usage_tracker/usage_tracker-Swift.h>
#else
// Support project import fallback if the generated compatibility header
// is not copied when this plugin is created as a library.
// https://forums.swift.org/t/swift-static-libraries-dont-copy-generated-objective-c-header/19816
#import "usage_tracker-Swift.h"
#endif

@implementation UsageTrackerPlugin
+ (void)registerWithRegistrar:(NSObject<FlutterPluginRegistrar>*)registrar {
  [SwiftUsageTrackerPlugin registerWithRegistrar:registrar];
}
@end
