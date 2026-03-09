
(() => {
  // --- CONFIGURATION ---
  const CONFIG = {
    maxUnfollows: 1000,         // Recommended: Do not exceed 100-200 per day
    minWaitMs: 900,          // Minimum wait between clicks
    maxWaitMs: 5000,          // Maximum wait between clicks
    confirmWaitMs: 3000,      // Max time to wait for the popup
    scrollPauseMs: 2500,      // Wait for page to load after scrolling
    breakEvery: 10,           // Take a long break after this many unfollows
    breakDurationMs: [10000, 20000] // Long break range (10-20 seconds)
  };

  // Helper for randomized "human" delays
  const randomSleep = (min, max) => {
    const ms = Math.floor(Math.random() * (max - min + 1) + min);
    return new Promise((r) => setTimeout(r, ms));
  };

  const findFollowingButtons = () =>
    Array.from(document.querySelectorAll('button')).filter((btn) => {
      const label = btn.textContent?.trim();
      if (label !== 'Following') return false;
      
      // Filter out navigation/tab buttons
      const isTab = btn.closest('[role="tablist"]') || 
                    btn.closest('nav') || 
                    btn.getAttribute('role') === 'tab' ||
                    btn.classList.contains('artdeco-tab');
      return !isTab;
    });

  const waitForConfirmButton = async (timeoutMs) => {
    const start = performance.now();
    while (performance.now() - start < timeoutMs) {
      const btn = Array.from(document.querySelectorAll('button')).find((b) => {
        const text = b.textContent?.trim().toLowerCase();
        // Look for buttons that specifically say "Unfollow" in the modal
        return text === 'unfollow';
      });
      if (btn) return btn;
      await new Promise(r => setTimeout(r, 200));
    }
    return null;
  };

  const scrollMore = async () => {
    console.log('[unfollow] Scrolling for more profiles...');
    const before = document.body.scrollHeight;
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    await randomSleep(CONFIG.scrollPauseMs, CONFIG.scrollPauseMs + 1000);
    return document.body.scrollHeight > before;
  };

  const processed = new WeakSet();
  let unfollowed = 0;
  let scrollAttempts = 0;

  const run = async () => {
    console.log('%c[unfollow] Script Started Safely...', 'color: green; font-weight: bold;');
    
    while (unfollowed < CONFIG.maxUnfollows) {
      const buttons = findFollowingButtons().filter((b) => !processed.has(b));

      if (buttons.length === 0) {
        const grew = await scrollMore();
        scrollAttempts++;
        if (!grew || scrollAttempts > 5) {
          window.scrollTo(0, document.body.scrollHeight);
          await randomSleep(3000, 5000);
          const retry = findFollowingButtons().filter((b) => !processed.has(b));
          if (retry.length === 0) {
            console.log(`[unfollow] No more buttons found. Ending.`);
            break;
          }
          scrollAttempts = 0;
        }
        continue;
      }

      scrollAttempts = 0;
      for (const btn of buttons) {
        if (unfollowed >= CONFIG.maxUnfollows) break;

        // Long break check
        if (unfollowed > 0 && unfollowed % CONFIG.breakEvery === 0) {
            console.log(`%c[unfollow] Taking a human break for safety...`, 'color: orange;');
            await randomSleep(CONFIG.breakDurationMs[0], CONFIG.breakDurationMs[1]);
        }

        processed.add(btn);
        btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
        await randomSleep(800, 1500); // Wait after scrolling into view

        btn.click();
        console.log('[unfollow] Clicking "Following" button...');

        const confirm = await waitForConfirmButton(CONFIG.confirmWaitMs);
        if (confirm) {
          confirm.click();
          unfollowed++;
          console.log(`%c[unfollow] Success! Total: ${unfollowed}`, 'color: cyan;');
          // Randomized interval before next person
          await randomSleep(CONFIG.minWaitMs, CONFIG.maxWaitMs);
        } else {
          console.log('[unfollow] Confirmation modal not found, skipping user.');
          await randomSleep(500, 1000);
        }
      }
    }
    console.log(`%c[unfollow] Completed. Total unfollowed this session: ${unfollowed}`, 'color: green; font-size: 14px;');
  };

  run();
})();

---

### Best Practices to Avoid a Ban:
1.  **Do not use the tab while the script is running:** Keep the window active and don't click on items yourself, as this creates "conflicting" input that looks like a bot.
2.  **Daily Limit:** Even with this script, do not run it more than 2-3 times a day. If you unfollow 1,000 people in 2 hours, the platform will flag you regardless of the specific script used.
3.  **Check Language:** This script specifically looks for the English word **"Following"** and **"Unfollow."** If your site is in another language, you must change those text strings in the code.
4.  **The "Slow and Steady" Rule:** It is much better to unfollow 50 people every hour than 500 people in 10 minutes. Adjust `maxUnfollows` to small batches for the highest safety.
