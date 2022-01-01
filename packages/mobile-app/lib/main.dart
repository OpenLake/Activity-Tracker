import 'dart:async';

import 'package:app_usage/app_usage.dart';
import 'package:flutter/material.dart';

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
        // This is the theme of your application.
        //
        // Try running your application with "flutter run". You'll see the
        // application has a blue toolbar. Then, without quitting the app, try
        // changing the primarySwatch below to Colors.green and then invoke
        // "hot reload" (press "r" in the console where you ran "flutter run",
        // or simply save your changes to "hot reload" in a Flutter IDE).
        // Notice that the counter didn't reset back to zero; the application
        // is not restarted.
        primarySwatch: Colors.blue,
      ),
      home: const MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  // This widget is the home page of your application. It is stateful, meaning
  // that it has a State object (defined below) that contains fields that affect
  // how it looks.

  // This class is the configuration for the state. It holds the values (in this
  // case the title) provided by the parent (in this case the App widget) and
  // used by the build method of the State. Fields in a Widget subclass are
  // always marked "final".

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {

  // static const timeout = Duration(seconds: 3);
  // static const ms = Duration(milliseconds: 1);
  //
  // Timer startTimeout([int? milliseconds]) {
  //   var duration = milliseconds == null ? timeout : ms * milliseconds;
  //   return Timer(duration, handleTimeout);
  // }
  //
  // void handleTimeout() {  // callback function
  //   getUsageStats();
  // }

  DateTime startDate = DateTime(2022, 01, 01);

  void getUsageStats() async {
    Timer mytimer = Timer.periodic(Duration(seconds: 1), (timer) async {
      try {

        DateTime endDate = new DateTime.now();

        print(startDate);
        print(endDate);

        List<AppUsageInfo> infos = await AppUsage.getAppUsage(startDate, endDate);

        // String name = infos.

        print(infos);

        setState(() {
          List<AppUsageInfo> _infos = infos;
          startDate = DateTime.now();
        });
      } on AppUsageException catch (exception) {
        print(exception);
      }
    });

    super.initState();

    }










  // /// The name of the application
  //
  //
  // /// The name of the application package
  //
  //
  // /// The amount of time the application has been used
  // /// in the specified interval
  // Duration get usage;
  //
  // /// The start of the interval
  // DateTime get startDate;
  //
  // /// The end of the interval
  // DateTime get endDate;

  @override
  Widget build(BuildContext context) {
    // This method is rerun every time setState is called, for instance as done
    // by the _incrementCounter method above.
    //
    // The Flutter framework has been optimized to make rerunning build methods
    // fast, so that you can just rebuild anything that needs updating rather
    // than having to individually change instances of widgets.
    return Scaffold(

      floatingActionButton: FloatingActionButton(
        onPressed: getUsageStats,
        tooltip: 'Log',
        child: const Icon(Icons.add_alarm_sharp),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
