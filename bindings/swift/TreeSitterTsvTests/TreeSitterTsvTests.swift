import XCTest
import SwiftTreeSitter
import TreeSitterTsv

final class TreeSitterTsvTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_tsv())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Tsv grammar")
    }
}
