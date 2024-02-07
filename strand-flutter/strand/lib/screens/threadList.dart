import 'package:flutter/material.dart';
import 'package:strand/screens/thread.dart';

class ThreadList extends StatefulWidget {
  @override
  _ThreadState createState() => _ThreadState();
}

class _ThreadState extends State<ThreadList> {
  String brand = 'DMC';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: Expanded(
      child: GridView.count(
          primary: false,
          padding: const EdgeInsets.all(5),
          crossAxisSpacing: 5,
          mainAxisSpacing: 5,
          crossAxisCount: 4,
          children: List.generate(10, (index) => Thread())),
    ));
  }
}
