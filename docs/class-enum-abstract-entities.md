# Classes, Enums, and Data Types

## Classes

A `class` defines a collection of attributes representing a type of object.

### Basic Class

```lml
class Studio {
  attribute location, String
  attribute potter, String
  attribute kiln, String
}
```

### Class with Definition

```lml
class Ceramic {
  definition {
    This class represents a ceramic object.
  }
  attribute type, String
  attribute firing_temperature, Integer
}
```

### Class with Constraints

```lml
class GlazeTechnique {
  attribute name, String {
    values { "Celadon", "Raku", "Majolica" }
  }
}
```

## Attributes

### Full Syntax

```lml
attribute name, Type { cardinality min..max default: value }
```

### Attribute Types

| Component | Description |
|-----------|-------------|
| `name` | The attribute name |
| `Type` | The attribute type (primitive or class reference) |
| `cardinality` | Number of allowed values |
| `default` | Default value |
| `values` | Allowed values constraint |
| `pattern` | Regex pattern for strings |

### Visibility

Visibility modifiers control access:

| Modifier | Visibility |
|----------|------------|
| `+` | public (default) |
| `-` | private |
| `#` | protected |
| `~` | package |

Example:

```lml
class Figure {
  + radius        // public attribute
  - filled        // private attribute
  # length        // protected attribute
}
```

### Attribute with Definition

```lml
class Figure {
  attribute radius, Float {
    definition {
      Radius of the Figure
    }
  }
}
```

## Enums

An `enum` defines a named collection of values.

### Simple Enum

```lml
enum FiringProfile {
  values { "low", "medium", "high" }
}
```

### Enum with Definitions

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

### Enum with Instance Values

Enums can contain instances:

```lml
class GlazeType {
  attribute name, String
  attribute description, String
}

enum GlazeTypes {
  definition "Types of glaze finishes"

  value "matte" {
    instance {
      name = "matte"
      definition = "Non-reflective finish"
    }
  }
  value "gloss" {
    instance {
      name = "gloss"
      definition = "Reflective finish"
    }
  }
}
```

## Data Types

### Primitive Types

Define primitives with the `primitive` keyword:

```lml
primitive Integer
primitive String
primitive Float
primitive Boolean
```

### Data Type

Define custom data types with `data_type`:

```lml
data_type "Banking Information" {
  "art code"
}
```

## Packages

Organize classes and enums in packages:

```lml
package Ceramics {
  enum FiringProfile {
    values { "low", "medium", "high" }
  }

  class CeramicTile {
    attribute dimensions, Float { cardinality 2 }
    attribute firing_profile, FiringProfile
  }
}
```

### Nested Packages

```lml
package Ceramics {
  class Ceramic {
    attribute volume, Float
    attribute color, String

    // Reference to nested package
    attribute tiles, Materials::CeramicTile { cardinality 0..n }
  }

  package Materials {
    enum FiringProfile {
      values { "low", "medium", "high" }
    }

    class CeramicTile {
      attribute dimensions, Dimension
      attribute firing_profile, FiringProfile
    }
  }
}
```

## Complete Example

```lml
package Ceramics {

  enum FiringProfile {
    value "low"
    value "medium"
    value "high"
  }

  class Dimension {
    attribute length, Float
    attribute width, Float
    attribute height, Float
  }

  class CeramicTile {
    definition {
      A ceramic tile with specific dimensions and firing profile.
    }

    attribute dimensions, Dimension
    attribute firing_profile, FiringProfile {
      definition "The temperature profile used for firing"
    }
  }

}
```
