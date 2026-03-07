package tree_sitter_tsv_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_tsv "github.com/tree-sitter/tree-sitter-tsv/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_tsv.Language())
	if language == nil {
		t.Errorf("Error loading Tsv grammar")
	}
}
