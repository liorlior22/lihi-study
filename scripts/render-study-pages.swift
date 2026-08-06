import Foundation
import PDFKit
import AppKit

guard CommandLine.arguments.count == 3 else { fatalError("usage: render-study-pages input.pdf output-directory") }
let input = URL(fileURLWithPath: CommandLine.arguments[1])
let output = URL(fileURLWithPath: CommandLine.arguments[2], isDirectory: true)
try FileManager.default.createDirectory(at: output, withIntermediateDirectories: true)
guard let document = PDFDocument(url: input) else { fatalError("Unable to open PDF") }

for index in 0..<document.pageCount {
  autoreleasepool {
    guard let page = document.page(at: index) else { return }
    let bounds = page.bounds(for: .mediaBox)
    let width: CGFloat = 940
    let height = width * bounds.height / bounds.width
    let image = page.thumbnail(of: NSSize(width: width, height: height), for: .mediaBox)
    guard let tiff = image.tiffRepresentation, let bitmap = NSBitmapImageRep(data: tiff), let data = bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.76]) else { return }
    let filename = String(format: "page-%03d.jpg", index + 1)
    try? data.write(to: output.appendingPathComponent(filename))
  }
}
print("Rendered \(document.pageCount) pages")
