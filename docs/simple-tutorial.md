# Simple Tutorial

This tutorial introduces the LutaML language for defining data models and instances.

## What is LutaML?

LutaML is a language for defining information models and instances of those models. It provides a single language that can be used to:

- Define information models that are human-readable and interchangeable
- Specify serialization formats of information models
- Parse, validate, and utilize those information models in programming languages

## Basic Concepts

### Classes and Attributes

A `class` defines a collection of attributes. Each attribute has a name and a type.

```lml
class Studio {
  attribute location, String {
    definition "Location of the studio"
  }
  attribute potter, String {
    definition "Name of the potter"
  }
  attribute kiln, String {
    definition "Type of kiln used"
  }
}
```

### Primitive Types

LutaML supports the following primitive types:

| Type | Example |
|------|---------|
| `String` | `"high-fire"` |
| `Integer` | `42` |
| `Float` | `3.5` |
| `Boolean` | `true` |
| `DateTime` | `2024-01-01T12:00:00+00:00` |
| `TimeWithoutDate` | `12:00:00` |
| `Decimal` | `3.14159` |
| `Hash` | `{ "key": "value" }` |

### Enums

An `enum` defines a named collection of values:

```lml
enum GlazeTechnique {
  definition "Techniques for glazing ceramics"

  value "Celadon" {
    definition "Technique that creates glaze in a pale green color"
  }
  value "Raku" {
    definition "Technique that creates a crackled glaze"
  }
  value "Majolica" {
    definition "Technique that creates a white glaze"
  }
}
```

### Packages

Use `package` to organize related classes and enums:

```lml
package Ceramics {
  enum FiringProfile {
    values { "low", "medium", "high" }
  }

  class CeramicTile {
    attribute dimensions, Float { cardinality 2 }  // [length, width]
    attribute firing_profile, FiringProfile
  }
}
```

Packages can be nested, and you can reference types using `::` notation:

```lml
class Ceramic {
  // Refers to a type in a nested package
  attribute tiles, Materials::CeramicTile { cardinality 0..n }
}
```

## Attribute Constraints

### Cardinality

Specify the allowed number of values for an attribute:

```lml
attribute batch_ids, String { cardinality 0..n }
attribute coordinates, Float { cardinality 2 }
```

### Values Constraint

Restrict an attribute to a specific set of values:

```lml
attribute firing_profile, FiringProfile {
  values { "low", "medium", "high" }
}
```

Or reference an enum:

```lml
enum FiringProfileEnum {
  value "low"
  value "medium"
  value "high"
}

class FiringProfile {
  attribute firing_profile, FiringProfile {
    values FiringProfileEnum
  }
}
```

### Pattern Validation

Use regular expressions to validate string values:

```lml
attribute color, String {
  pattern /\A#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\z/
}
```

### Default Values

Set default values for attributes:

```lml
class Glaze {
  attribute color, String { default: "Clear" }
  attribute temperature, Integer { default: 1050 }
}
```

## Comments

### Single-line Comments

```lml
// This is a comment
class Ceramic {
  // Write docs
  + glazeType: GlazeType // Glaze type
}
```

### Multi-line Comments

```lml
/* This is a
multi-line comment */
```

### Definition Blocks

The `definition` block provides multiline descriptions:

```lml
class Ceramic {
  definition {
    This class represents a ceramic object.
  }
}
```

## Creating Instances

Use `instance` to create instances of classes:

```lml
class CeramicTile {
  attribute dimensions, Float { cardinality 2 }
  attribute firing_profile, FiringProfile
}

instance "square" CeramicTile {
  dimensions = [30.5, 30.5]
  firing_profile = "high"

  definition {
    A square ceramic tile used for various applications.
  }
}
```

### Instance Collections

Group multiple instances together:

```lml
instances "Tiles" {
  instance "square" CeramicTile {
    dimensions = [30.5, 30.5]
    firing_profile = "high"
  }

  instance "circle" CeramicTile {
    dimensions = [20.5, 20.5]
    firing_profile = "medium"
  }
}
```

## References

Link instances together using `ref:`:

```lml
instances Production {
  GlazeFormula "gloss_blue" {
    components = ["silica", "cobalt"]
  }

  CeramicTile "tile_001" {
    glaze = ref:(GlazeFormula.gloss_blue)
  }
}
```

## Complete Example

Here's a complete example defining a ceramic product model:

```lml
package Ceramics {
  enum FiringProfile {
    values { "low", "medium", "high" }
  }

  class CeramicTile {
    attribute dimensions, Float { cardinality 2 }
    attribute firing_profile, FiringProfile
    definition {
      Types of ceramic tiles.
    }
  }
}

instances Tiles {
  Ceramics::CeramicTile "tile_001" {
    dimensions = [30.5, 30.5]
    firing_profile = "high"
  }

  Ceramics::CeramicTile "tile_002" {
    dimensions = [40.0, 60.0]
    firing_profile = "medium"
  }
}
```

## Next Steps

- Learn about [Annotations](/docs/annotations)
- Explore [Associations](/docs/associations)
- See [Class/Enum/Abstract Entities](/docs/class-enum-abstract-entities) for more details
