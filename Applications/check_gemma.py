# Sample script to check Gemma installation and usage

try:
    from gemma import gm
    print("Gemma is installed and imported successfully.")
    print("\nAvailable attributes in gm:", dir(gm))
    print("\nHelp for gm module:")
    help(gm)
    if hasattr(gm, 'text'):
        print("\nHelp for gm.text submodule:")
        help(gm.text)
except ImportError:
    print("Gemma is not installed. Please run 'pip install gemma'.")
except Exception as e:
    print(f"An error occurred: {e}")
