/**
 * @file TSV grammar for tree-sitter
 * @author shotarokuramata <shokuramata@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "tsv",

  extras: _ => [],

  rules: {
    document: $ => seq(
      repeat(seq($.row, /\r|\r\n|\n/)),
      optional($.row),
    ),

    row: $ => choice(
      seq($.field, repeat(seq("\t", optional($.field)))),
      repeat1(seq("\t", optional($.field))),
    ),

    field: $ => choice(
      $.null_literal,
      $.boolean,
      $.datetime,
      $.date,
      $.float,
      $.number,
      $.quoted_string,
      $.text,
    ),

    null_literal: _ => token(prec(2, choice("null", "NULL", "\\N"))),
    boolean: _ => token(prec(2, choice("true", "false", "TRUE", "FALSE"))),

    datetime: _ => token(prec(1, seq(
      /\d{4}-\d{2}-\d{2}/,
      /[T ]/,
      /\d{2}:\d{2}/,
      optional(seq(":", /\d{2}/)),
      optional(/\.\d+/),
      optional(choice("Z", "z", /[+-]\d{2}:?\d{2}/)),
    ))),
    date: _ => token(prec(1, /\d{4}-\d{2}-\d{2}/)),

    float: _ => token(prec(1, choice(
      /-?\d*\.\d+/,
      /-?\d+\.\d*/,
    ))),
    number: _ => token(prec(1, choice(
      /-?\d+/,
      /-?0[xX][0-9a-fA-F]+/,
    ))),

    quoted_string: _ => token(prec(1, seq('"', repeat(choice(/[^"]/, '""')), '"'))),
    text: _ => token(prec(-1, /[^\t\r\n]+/)),
  },
});
