# Associations and References

LutaML supports relationships between instances through references and instance collections.

## References

References link instances together using the `ref:` syntax.

### Basic Reference

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

### Cross-Package References

Reference instances across packages using the `::` notation:

```lml
require "materials.lml"

instances Tiles {
  Materials::CeramicTile "tile_001" {
    dimensions = [30.0, 30.0]
    firing_profile = "medium"
  }
}
```

## Instance Collections

Group related instances using `instances`:

```lml
instances "Studios" {
  instance Studio {
    location = "Paris"
    potter = "Marie"
    kiln = "Electric"
  }

  instance Studio {
    location = "Berlin"
    potter = "Hans"
    kiln = "Gas"
  }
}
```

## Attribute References

Attributes can reference other class types:

```lml
class Location {
  attribute city, String
  attribute address, String
}

class Order {
  attribute deliveryLocation, Location
  attribute number, Integer { cardinality 0..1 }
}
```

## Cardinality for Collections

Use cardinality to define collection relationships:

```lml
class Customer {
  attribute name, String { cardinality 0..n }
  attribute phone, String
}

class Order {
  attribute items, OrderItem { cardinality 1..n }
}
```

### Cardinality Notation

| Notation | Meaning |
|----------|---------|
| `1` | Exactly one (required) |
| `0..1` | Zero or one (optional) |
| `0..n` or `*` | Zero or more |
| `1..n` or `+` | One or more |
| `n` | Exactly n |

## Validation Rules

### Reference Validity

- `ref:` must resolve to a valid instance path
- Circular references are invalid
- Referenced instances must exist

### Example with Validation

```lml
instances Glazes {
  GlazeFormula "blue_matte" {
    components = ["silica", "cobalt"]
  }

  CeramicTile "tile_002" {
    // Valid: references an existing instance
    glaze = ref:(Glazes.blue_matte)
  }
}
```

## Complete Example

```lml
class Customer {
  attribute name, String { cardinality 0..n }
  attribute phone, String
}

class Order {
  attribute number, Integer { cardinality 0..1 }
  attribute customer, Customer
}

class Location {
  attribute city, String
  attribute address, String
}

instances Orders {
  Customer "customer_001" {
    name = ["John Doe"]
    phone = "+1-555-0100"
  }

  Order "order_001" {
    number = 1001
    customer = ref:(Customer.customer_001)
  }
}
```
