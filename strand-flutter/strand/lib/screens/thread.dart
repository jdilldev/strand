import 'package:flutter/material.dart';

class Thread extends StatefulWidget {
  @override
  _ThreadState createState() => _ThreadState();
}

class _ThreadState extends State<Thread> {
  String brand = 'DMC';

  @override
  Widget build(BuildContext context) {
    return Column(children: [
      Container(
          width: 50,
          height: 50,
          decoration: BoxDecoration(
              color: Colors.amber[400],
              borderRadius: BorderRadius.circular(10)),
          child: Container()),
      Text(
        'brand and number',
      ),
    ]);
  }
}
