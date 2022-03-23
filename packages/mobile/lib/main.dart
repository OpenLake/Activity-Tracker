import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:usage_tracker/usage_tracker.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;

const oneSecond = Duration(seconds: 1);
const baseUrl = "http://SERVER_URL:32768";
const activityPostUrl = "$baseUrl/api/mobile-activity/";

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Activity Tracker',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Activity Tracker'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  void startTimer() async {
    Timer _ = Timer.periodic(oneSecond, (timer) async {
      List<AppUsageInfo> infos = await getUsageStats();
      if (kDebugMode) {
        print(infos);
      }
      pushUsageStats(infos);
    });
  }

  void pushUsageStats(List<AppUsageInfo> infos) {
    final url = Uri.parse(activityPostUrl);
    for (var activityBlock in infos) {
      http.post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'name': activityBlock.appName,
          'startTime': activityBlock.startDate.toString(),
          'endTime': activityBlock.endDate.toString()
        }),
      );
    }
  }

  Future<List<AppUsageInfo>> getUsageStats() async {
    try {
      // String position = (await Geolocator.getCurrentPosition(
      //         desiredAccuracy: LocationAccuracy.high))
      //     .toString();

      DateTime endDate = DateTime.now();
      DateTime startDate = endDate.subtract(oneSecond);

      List<AppUsageInfo> infos =
          await UsageTracker.getAppUsage(startDate, endDate);

      return infos;
    } on AppUsageException catch (exception) {
      // ignore: avoid_print
      print(exception);
      return [];
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: const <Widget>[
            Text(
              'Txt',
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: startTimer,
        tooltip: 'Start Timer',
        child: const Icon(Icons.add_alarm_sharp),
      ),
    );
  }
}
