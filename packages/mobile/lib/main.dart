import 'dart:async';

import 'package:flutter/material.dart';
import 'package:usage_tracker/usage_tracker.dart';
import 'package:geolocator/geolocator.dart';
import 'package:http/http.dart' as http;

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(

        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
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
  List<AppUsageInfo> _infos = [];




  void getUsageStats() async {
    Timer mytimer = Timer.periodic(Duration(seconds: 1), (timer) async {

      try {

        Position position = await Geolocator.getCurrentPosition(desiredAccuracy: LocationAccuracy.high);

        Duration oneSecond = const Duration(seconds: 1);
        DateTime endDate = DateTime.now();
        DateTime startDate = endDate.subtract(oneSecond);

        List<AppUsageInfo> infos =
            await UsageTracker.getAppUsage(startDate, endDate);

        setState(() {
          _infos = infos;
        });

        print(startDate);
        print(endDate);
        print(_infos);
        print(position);
      }

      on AppUsageException catch (exception) {
        // ignore: avoid_print
        print(exception);
      }

    });
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
          children: <Widget>[
            const Text(
              'Nothing here . . .',
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        // onPressed: getUsageStats,
        onPressed: getUsageStats,
        tooltip: 'Increment',
        child: const Icon(Icons.add_alarm_sharp),
      ),
    );
  }
}
