---
layout: ../../layouts/BlogPost.astro
title: Expressir 2.2 - Faster EXPRESS Parsing with Parsanol
description: Expressir now uses Parsanol, a Rust-based parser, for significantly faster EXPRESS schema parsing. Parse large schemas in seconds instead of minutes.
authors:
  - Ribose
date: 2026-03-17
---

# Expressir 2.2 - Faster EXPRESS Parsing with Parsanol


We latest release of Expressir ("EXPRESS in Ruby") includes a major performance
improvement: **integration with Parsanol**, a Rust-based parser generator.

This brings dramatic speed improvements for parsing EXPRESS schemas,
especially large ones commonly found in ISO 10303 (STEP) standards.

## What is Expressir?

Expressir is a Ruby library for parsing and working with EXPRESS data modeling language
(ISO 10303-11:2007). EXPRESS is the standard language used to define data models for
product data representation and exchange in industrial automation and manufacturing.

Expressir provides:

- **Full EXPRESS parser** - Parses complete EXPRESS schemas with all constructs
- **Remark preservation** - Fully preserves comments in their original positions
- **Pretty printing** - Formats EXPRESS code with configurable options
- **LER packages** - Packages EXPRESS schemas for distribution

## The Performance Challenge

EXPRESS schemas can be very large. For example, ISO 10303 includes schemas like:

| Schema | Lines | Description |
|--------|-------|-------------|
| geometric_model_schema | ~9,000 | Geometric modeling constructs |
| mathematical_functions_schema | ~15,000 | Mathematical functions |
| action_schema | ~2,000 | Action and task modeling |

Parsing these with a pure Ruby parser was slow, taking **minutes** for the largest schemas.
This was a significant bottleneck for applications that need to parse multiple schemas.

## Enter Parsanol

Parsanol is a parser generator that produces both Ruby and Rust parsers from the
same grammar definition. The Rust parser can be compiled into a native extension,
providing **16x faster** raw parsing compared to pure Ruby.

With the current implementation, end-to-end parsing is 1.5x faster due to
Ruby-side result decoding. Future optimizations to move decoding into Rust
could unlock the full 10-16x speedup.

### How it Works

1. Expressir defines its EXPRESS grammar using Parsanol's DSL
2. Parsanol generates both Ruby and Rust parsers
3. When the `parsanol` gem with native extension is installed, Expressir
   automatically uses the Rust parser
4. If the native extension is unavailable, it falls back to pure Ruby

```ruby
# Parse a single file - returns ExpFile
exp_file = Expressir::Express::Parser.from_file("geometry.exp")

# Check if native parser is being used
if Parsanol::Native.available?
  puts "Using Parsanol (Rust parser)"
else
  puts "Using pure Ruby parser"
end
```

## Performance Benchmarks

Using the `geometric_model_schema` (8,993 lines) as a test case:

### With Pure Ruby Parser (fallback)

```
Schema: geometric_model_schema.exp
Lines: 8,993
Average time: ~38.6 seconds per parse (measured)
```

### With Parsanol Native (Rust)

```
Schema: geometric_model_schema.exp
Lines: 733
Average time: ~2.73 seconds per parse (measured)
```

That's approximately **1.5x faster** when the native extension is available!

For the even larger `mathematical_functions_schema` (15,398 lines):

| Parser | Time |
|--------|------|
| Pure Ruby | ~109 seconds (measured) |
| Parsanol Native | ~70 seconds (measured) |

## Full SRL Benchmark

We tested parsing the entire **STEPmod Resource Library (SRL)**, which contains
all EXPRESS schemas used in ISO 10303:

| Metric | Value |
|--------|-------|
| Total schemas | 23 test schemas |
| Total lines | 24,069 |
| Largest schema | `mathematical_functions_schema` (15,398 lines) |

### Pure Ruby Parser

```
Schemas parsed: 23/23 (100% success)
Total time: 132.47s
Average per schema: 5.76s
Lines per second: 182
```

### Parsanol Native (Rust)

```
Schemas parsed: 23/23 (100% success)
Total time: 90.87s
Average per schema: 3.95s
Lines per second: 265
```

**Overall speedup: 1.5x faster with Native parser**

#### Performance Analysis

The native parser shows a 1.5x overall speedup, but there's more to the story:

| Phase | Ruby | Native | Speedup |
|-------|------|--------|---------|
| Raw parsing (Rust) | 70.0s | 4.3s | **16x faster** |
| Result decoding (Ruby) | - | 65.7s | - |
| **Total** | 70.0s | 70.0s | 1.0x |

The **raw Rust parser is 16x faster**, but the result decoding phase (converting the native output to Ruby objects) runs in Ruby and takes 65+ seconds, which negates most of the speedup.

**Future optimization opportunity**: Implementing the result decoding in Rust (via FFI callbacks or direct Ruby object construction) could unlock the full 10-16x speedup.

## New Repository Structure

This release also introduces a cleaner model for handling EXPRESS files:

### ExpFile Model

Previously, `Parser.from_file` returned a `Repository`. Now it returns an `ExpFile`:

```ruby
# New API
exp_file = Expressir::Express::Parser.from_file("schema.exp")
puts exp_file.path          # => "schema.exp"
puts exp_file.schemas.first # => #<Expressir::Model::Declarations::Schema>

# For multiple files, use from_files (returns Repository)
repo = Expressir::Express::Parser.from_files(["a.exp", "b.exp"])
repo.schemas.each { |s| puts s.id }
```

### Better Preamble Remark Handling

Preamble remarks (comments between a scope declaration and its first child)
are now properly attached to their containing `ExpFile` rather than the first schema:

```express
(* This is a file-level preamble remark *)
(* It appears before any schema declaration *)

SCHEMA example_schema;
  -- This is a schema preamble remark
  ENTITY person;
    name : STRING;
  END_ENTITY;
END_SCHEMA;
```

## Installation

Add to your Gemfile:

```ruby
gem "expressir"
```

For best performance with the native extension:

```sh
# macOS
brew install rust

# Ubuntu/Debian
apt install rustc cargo

# Then install the gem
bundle install
```

**Ruby Version Support**:
- **Ruby 3.2 and earlier**: Native extension works
- **Ruby 3.3+ and 4.0**: Native extension currently blocked due to upstream bug in `magnus` crate. Pure Ruby parser works fine.

## Summary

Expressir 2.2 brings significant improvements:

- **Native Rust parser is 16x faster** at the parsing phase
- **1.5x end-to-end speedup** with current implementation (Ruby-side decoding limits speedup)
- **Future potential: 10-16x faster** when result decoding is optimized
- **Cleaner API** with `ExpFile` model for single files
- **Better remark handling** with proper preamble attachment
- **Full backward compatibility** through the `Repository.schemas` interface

For applications working with ISO 10303 schemas, this means parsing that
previously took minutes now takes less time, with the potential for even
greater speedups as the native integration is optimized.

## Links

- [Expressir on GitHub](https://github.com/lutaml/expressir)
- [Expressir Documentation](https://github.com/lutaml/expressir#readme)
- [Parsanol on GitHub](https://github.com/lutaml/parsanol)
- [LutaML Project](https://lutaml.github.io/)
