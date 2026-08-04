import Foundation
import PDFKit

func reversed(_ value: String) -> String { String(value.reversed()) }
func repairRuns(_ value: String, pattern: String) -> String {
  guard let regex = try? NSRegularExpression(pattern: pattern) else { return value }
  let source = value as NSString
  var result = value
  for match in regex.matches(in: value, range: NSRange(location: 0, length: source.length)).reversed() {
    let segment = source.substring(with: match.range)
    if let range = Range(match.range, in: result) { result.replaceSubrange(range, with: reversed(segment)) }
  }
  return result
}
func normalize(_ line: String) -> String {
  let controls = CharacterSet(charactersIn: "\u{202A}\u{202B}\u{202C}\u{202D}\u{202E}\u{2066}\u{2067}\u{2068}\u{2069}")
  let clean = line.components(separatedBy: controls).joined().trimmingCharacters(in: .whitespacesAndNewlines)
  guard !clean.isEmpty else { return "" }
  var value = reversed(clean)
  value = repairRuns(value, pattern: "[A-Za-z][A-Za-z0-9'’.-]*(?:\\s+[A-Za-z][A-Za-z0-9'’.-]*)*")
  value = repairRuns(value, pattern: "[0-9]+(?:[.,:/-][0-9]+)*")
  return value
}

guard CommandLine.arguments.count == 3 else { fatalError("usage: extract-study input.pdf output.json") }
guard let document = PDFDocument(url: URL(fileURLWithPath: CommandLine.arguments[1])) else { fatalError("Unable to open PDF") }
var pages: [[String: Any]] = []
for index in 0..<document.pageCount {
  let lines = (document.page(at: index)?.string ?? "").split(separator: "\n", omittingEmptySubsequences: false).map { normalize(String($0)) }.filter { !$0.isEmpty }
  pages.append(["page": index + 1, "lines": lines])
}
let data = try JSONSerialization.data(withJSONObject: pages, options: [.prettyPrinted, .sortedKeys, .withoutEscapingSlashes])
try data.write(to: URL(fileURLWithPath: CommandLine.arguments[2]))
print("Extracted \(pages.count) pages")
