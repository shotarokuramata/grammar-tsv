// swift-tools-version:5.3

import Foundation
import PackageDescription

var sources = ["src/parser.c"]
if FileManager.default.fileExists(atPath: "src/scanner.c") {
    sources.append("src/scanner.c")
}

let package = Package(
    name: "TreeSitterTsv",
    products: [
        .library(name: "TreeSitterTsv", targets: ["TreeSitterTsv"]),
    ],
    dependencies: [
        .package(name: "SwiftTreeSitter", url: "https://github.com/tree-sitter/swift-tree-sitter", from: "0.9.0"),
    ],
    targets: [
        .target(
            name: "TreeSitterTsv",
            dependencies: [],
            path: ".",
            sources: sources,
            resources: [
                .copy("queries")
            ],
            publicHeadersPath: "bindings/swift",
            cSettings: [.headerSearchPath("src")]
        ),
        .testTarget(
            name: "TreeSitterTsvTests",
            dependencies: [
                "SwiftTreeSitter",
                "TreeSitterTsv",
            ],
            path: "bindings/swift/TreeSitterTsvTests"
        )
    ],
    cLanguageStandard: .c11
)
