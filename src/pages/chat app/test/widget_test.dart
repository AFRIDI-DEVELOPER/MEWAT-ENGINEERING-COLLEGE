import 'package:flutter_test/flutter_test.dart';
import 'package:privacy_chat/main.dart';

void main() {
  testWidgets('App smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const PrivacyChatApp());

    // Verify that the title or initial screen loads
    expect(find.byType(PrivacyChatApp), findsOneWidget);
  });
}
