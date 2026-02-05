# Gemma Python Package Usage Guide

## Installation

To install Gemma, run:

```
pip install gemma
```

## Verifying Installation

To check if Gemma is installed, run this command in your terminal:

```
python -c "from gemma import gm; print('Gemma is installed')"
```

If you see "Gemma is installed" without errors, the installation was successful.

## Basic Usage

Import Gemma in your Python script as follows:

```python
from gemma import gm

# Example: List available attributes and methods
print(dir(gm))
```

Replace the example with actual Gemma functions as needed. Refer to the official documentation or use `help(gm)` in Python for more details.

## Troubleshooting

- If you see an error about import style, use `from gemma import gm` instead of `import gemma`.
- If you need a specific version, use `pip install gemma==<version>`.

## More Information

Refer to the official Gemma documentation for advanced usage and examples.
