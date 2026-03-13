# Annotations

Annotations in LutaML are provided through the `definition` construct, which allows you to add descriptive documentation to classes, attributes, enums, and values.

## Definition Block

The `definition` block is used to add multiline descriptions to any construct.

### Class Definition

```lml
class Ceramic {
  definition {
    This class represents a ceramic object.
    It can be used to model various types of ceramics
    including pottery, tiles, and sculptures.
  }
}
```

### Attribute Definition

```lml
class AddressClassProfile {
  definition {
    This is a multiline definition
    with `asciidoc` formatting support
    and list items
  }
  +addressClassProfile: CharacterString { cardinality 0..1 }
}
```

### Inline Attribute Definition

```lml
class AttributeProfile {
  attribute imlicistAttributeProfile, CharacterString { cardinality 0..1 } {
    definition {
      This is an attribute definition
      with multiple lines
      end definition
    }
  }
}
```

### Enum Value Definition

```lml
enum GlazeTechnique {
  value "Celadon" {
    definition "Technique that creates glaze in a pale green color"
  }
  value "Raku" {
    definition "Technique that creates a crackled glaze"
  }
}
```

## Definition Syntax

### String Format

For single-line definitions, use a string:

```lml
definition "Non-reflective finish"
```

### Block Format

For multiline definitions, use a block:

```lml
definition {
  Non-reflective finish.

  A matte finish is a non-reflective finish that is often used in ceramics.
}
```

## Using Definitions

Definitions are used for:

1. **Documentation** - Generate human-readable documentation
2. **Validation rules** - Describe constraints and requirements
3. **Code generation** - Create comments in generated code
4. **Schema documentation** - Annotate serialization schemas

## Example

```lml
class GlazeType {
  definition {
    Types of glaze finishes available for ceramic pieces.
    Each type has different visual and textural characteristics.
  }

  attribute name, String {
    definition "The name of the glaze type"
  }

  attribute description, String {
    definition "A detailed description of the glaze characteristics"
  }
}
```
