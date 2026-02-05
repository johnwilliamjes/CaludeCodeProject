"""
Google Search Automation Script
This script launches Google Chrome and performs a search for 'test automation'
"""

from playwright.sync_api import sync_playwright
import time


def run_google_search():
    """Launch Google and perform a test automation search"""
    
    with sync_playwright() as p:
        # Launch browser (use headless=False to see the browser)
        browser = p.chromium.launch(headless=False, slow_mo=500)
        
        # Create a new browser context and page
        context = browser.new_context()
        page = context.new_page()
        
        try:
            # Navigate to Google
            print("Navigating to Google...")
            page.goto("https://www.google.com")
            
            # Wait for the search box to be visible
            page.wait_for_selector('textarea[name="q"]', timeout=5000)
            
            # Type in the search box
            print("Typing search query...")
            page.fill('textarea[name="q"]', 'test automation')
            
            # Press Enter to search
            print("Submitting search...")
            page.press('textarea[name="q"]', 'Enter')
            
            # Wait for search results to load
            page.wait_for_selector('#search', timeout=10000)
            print("Search results loaded successfully!")
            
            # Get the page title
            title = page.title()
            print(f"Page title: {title}")
            
            # Take a screenshot
            screenshot_path = "google_search_results.png"
            page.screenshot(path=screenshot_path)
            print(f"Screenshot saved to: {screenshot_path}")
            
            # Wait a bit to see the results
            time.sleep(3)
            
            # Get search result count (optional)
            result_stats = page.locator('#result-stats').text_content()
            if result_stats:
                print(f"Search stats: {result_stats}")
            
        except Exception as e:
            print(f"An error occurred: {e}")
            page.screenshot(path="error_screenshot.png")
            
        finally:
            # Close the browser
            print("Closing browser...")
            context.close()
            browser.close()
            print("Automation completed!")


if __name__ == "__main__":
    run_google_search()
