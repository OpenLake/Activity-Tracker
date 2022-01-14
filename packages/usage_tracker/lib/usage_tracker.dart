// import 'dart:async';

// import 'package:flutter/services.dart';

// class UsageTracker {

// }

import 'dart:async';

import 'package:flutter/services.dart';
import 'dart:io' show Platform;

/// Custom Exception for the plugin,
/// thrown whenever the plugin is used on platforms other than Android
class AppUsageException implements Exception {
  final String _cause;

  AppUsageException(this._cause);

  @override
  String toString() {
    return _cause;
  }
}

class AppUsageInfo {
  late String _packageName, _appName;
  late Duration _usage;
  // ignore: prefer_final_fields
  DateTime _startDate, _endDate;

  AppUsageInfo(
      String name, double usageInSeconds, this._startDate, this._endDate) {
    List<String> tokens = name.split('.');
    _packageName = name;
    _appName = tokens.last;
    _usage = Duration(seconds: usageInSeconds.toInt());
  }

  /// The name of the application
  String get appName => _appName;

  /// The name of the application package
  String get packageName => _packageName;

  /// The amount of time the application has been used
  /// in the specified interval
  Duration get usage => _usage;

  /// The start of the interval
  DateTime get startDate => _startDate;

  /// The end of the interval
  DateTime get endDate => _endDate;

  @override
  String toString() {
    return 'App Usage: $packageName - $appName, duration: $usage [$startDate, $endDate]';
  }
}

class UsageTracker {
  static Future<String?> get platformVersion async {
    final String? version =
        await _methodChannel.invokeMethod('getPlatformVersion');
    return version;
  }

  static const MethodChannel _methodChannel =
      MethodChannel("usage_tracker.methodChannel");

  static Future<List<AppUsageInfo>> getAppUsage(
      DateTime startDate, DateTime endDate) async {
    if (Platform.isAndroid) {
      /// Convert dates to ms since epoch
      int end = endDate.millisecondsSinceEpoch;
      int start = startDate.millisecondsSinceEpoch;

      /// Set parameters
      Map<String, int> interval = {'start': start, 'end': end};

      /// Get result and parse it as a Map of <String, double>
      Map usage = await _methodChannel.invokeMethod('getUsage', interval);
      Map<String, double> _map = Map<String, double>.from(usage);

      /// Convert each entry in the map to an Application object
      return _map.keys
          .map((k) => AppUsageInfo(k, _map[k]!, startDate, endDate))
          .where((a) => a.usage > const Duration(seconds: 0))
          .toList();
    }
    throw AppUsageException("AppUsage API exclusively available on Android!");
  }
}
