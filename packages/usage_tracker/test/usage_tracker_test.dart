import 'package:flutter/services.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:usage_tracker/usage_tracker.dart';

void main() {
  const MethodChannel channel = MethodChannel('usage_tracker.methodChannel');

  TestWidgetsFlutterBinding.ensureInitialized();

  setUp(() {
    channel.setMockMethodCallHandler((MethodCall methodCall) async {
      if (methodCall.method == "getPlatformVersion") {
        return '42';
      } else if (methodCall.method == "getUsage") {
        return {'zero': 0, 'one': 1, 'two': 2};
      } else {
        return "";
      }
    });
  });

  tearDown(() {
    channel.setMockMethodCallHandler(null);
  });

  test('getPlatformVersion', () async {
    expect(await UsageTracker.platformVersion, '42');
  });

  test('getUsage', () async {
    DateTime startDate = DateTime(2018, 01, 01);
    DateTime endDate = DateTime.now();

    expect(await UsageTracker.getAppUsage(startDate, endDate),
        {'zero': 0, 'one': 1, 'two': 2});
  });
}
