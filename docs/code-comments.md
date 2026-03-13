# Code Comments

LutaML supports several types of comments for different purposes.

## Single-line Comments

Use `//` for comments that are ignored by the parser:

```lml
// This is a comment
class Pet {}
```

Tail comments at the end of a line:

```lml
class Figure {
  + radius        // Public attribute `radius`
  - filled        // Private attribute `filled`
  # length        // Protected attribute `length`
}
```

## Multi-line Comments

Use `/* */` for multi-line comments:

```lml
/* This is a
   multi-line comment */

/*
  This is also a
  multi-line comment
*/
```

## Definition Blocks

The `definition` block creates documentation that is preserved with the model:

### Single-line Definition

```lml
definition "Non-reflective finish"
```

### Multi-line Definition

```lml
definition {
  Non-reflective finish.

  A matte finish is a non-reflective finish
  that is often used in ceramics.
}
```

### Definition in Classes

```lml
class Ceramic {
  definition {
    This class represents a ceramic object.
  }
}
```

### Definition in Attributes

```lml
class Figure {
  attribute radius, Float {
    definition {
      Radius of the Figure in centimeters.
    }
  }
}
```

### Definition in Enums

```lml
enum GlazeType {
  value "matte" {
    definition "Non-reflective finish"
  }
  value "gloss" {
    definition "Reflective finish"
  }
}
```

## Comment Placement

Comments can appear:

- At the beginning of a line
- After whitespace
- At the end of a line (tail comment)

```lml
// TODO: implement <1>
class Ceramic {
  // Write docs <2>
  + glazeType: GlazeType // Glaze type <3>
}
```

1. A line beginning with `//` is a comment
2. A line beginning with whitespace followed by `//` is a comment
3. Text after `//` on a line is a tail comment

## Key Differences

| Comment Type | Purpose | Preserved in Model |
|--------------|---------|-------------------|
| `//` | Developer notes | No |
| `/* */` | Multi-line developer notes | No |
| `definition` | Documentation | Yes |
