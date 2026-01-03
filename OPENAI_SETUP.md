# OpenAI API Setup Guide 🤖

## 🔑 Add Your OpenAI API Key

Your Campus Assistant is now configured to use **OpenAI** instead of Groq!

---

## ⚡ Quick Setup (2 Minutes):

### **Step 1: Get Your OpenAI API Key**

1. Go to: https://platform.openai.com/
2. Sign up or log in with your account
3. Click on your profile (top right) → **"View API keys"**
4. Click **"Create new secret key"**
5. Copy the key (starts with `sk-...`)

**⚠️ Important:** Save this key somewhere safe - you won't see it again!

---

### **Step 2: Add Key to Your Project**

Open the file: **`/src/config/openai.ts`**

Replace this line:
```typescript
export const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY_HERE";
```

With your actual key:
```typescript
export const OPENAI_API_KEY = "sk-proj-xxxxxxxxxxxxxxxxxxxxx";
```

---

### **Step 3: Save & Test**

1. **Save** the file (`/src/config/openai.ts`)
2. **Refresh** your app
3. Go to **Campus Assistant**
4. Send a test message: "Hello!"
5. ✅ The AI should respond!

---

## 📊 Configuration Details

### **Current Setup:**

| Setting | Value |
|---------|-------|
| **API Provider** | OpenAI |
| **Endpoint** | `https://api.openai.com/v1/chat/completions` |
| **Model** | `gpt-3.5-turbo` (fast & affordable) |
| **Temperature** | 0.7 (balanced creativity) |
| **Max Tokens** | 1000 |

---

## 🔄 Available Models

You can change the model in `/src/config/openai.ts`:

| Model | Speed | Cost | Quality | Best For |
|-------|-------|------|---------|----------|
| **gpt-3.5-turbo** | ⚡⚡⚡ Fast | 💰 Cheap | ⭐⭐⭐ Good | General queries (default) |
| **gpt-4** | ⚡ Slower | 💰💰💰 Expensive | ⭐⭐⭐⭐⭐ Excellent | Complex questions |
| **gpt-4-turbo** | ⚡⚡ Fast | 💰💰 Moderate | ⭐⭐⭐⭐ Very Good | Best balance |

**To change the model**, edit line 52 in `/src/config/openai.ts`:
```typescript
model: "gpt-3.5-turbo", // Change to "gpt-4" or "gpt-4-turbo"
```

---

## 💰 Pricing (Approximate)

### **GPT-3.5-Turbo:**
- **Input:** $0.0005 per 1K tokens (~750 words)
- **Output:** $0.0015 per 1K tokens (~750 words)
- **Example:** 1,000 messages ≈ $1-2

### **GPT-4-Turbo:**
- **Input:** $0.01 per 1K tokens
- **Output:** $0.03 per 1K tokens
- **Example:** 1,000 messages ≈ $20-40

**💡 Tip:** Start with GPT-3.5-Turbo - it's perfect for campus queries!

---

## 🔒 Security Best Practices

### ⚠️ **NEVER commit your API key to GitHub!**

**Option 1: Use Environment Variables (Recommended)**

1. Create a `.env` file in your project root:
```
VITE_OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxx
```

2. Update `/src/config/openai.ts`:
```typescript
export const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || "YOUR_OPENAI_API_KEY_HERE";
```

3. Add to `.gitignore`:
```
.env
```

**Option 2: Direct in Code (For Testing)**
- Just paste your key directly
- Don't push to GitHub
- ⚠️ Only for local development

---

## 🧪 Testing Your Setup

### **Test 1: Simple Query**
```
You: "Hello!"
AI: "Hi! I'm your BCA Campus Assistant..."
```

### **Test 2: Attendance Query**
```
You: "What is the minimum attendance requirement?"
AI: "At BVDU, students must maintain at least 75% attendance..."
```

### **Test 3: Syllabus Query**
```
You: "What subjects are in BCA Semester 3?"
AI: "BCA Semester 3 typically includes..."
```

---

## 🆘 Troubleshooting

### **Error: "Invalid API key"**
- ✅ Check you copied the entire key (starts with `sk-`)
- ✅ Make sure there are no extra spaces
- ✅ Verify the key is active on OpenAI dashboard

### **Error: "Rate limit exceeded"**
- ⏰ You've sent too many requests
- Wait a few minutes and try again
- Consider upgrading your OpenAI plan

### **Error: "Insufficient quota"**
- 💰 Add credits to your OpenAI account
- Go to: https://platform.openai.com/account/billing
- Add payment method and credits

### **Error: "Network error"**
- 🌐 Check your internet connection
- 🔥 Check if OpenAI is down: https://status.openai.com/
- Try refreshing the page

### **AI Not Responding**
- 🔍 Open browser console (F12)
- Look for error messages
- Check if API key is correctly set
- Verify you have internet connection

---

## 📈 Usage Limits

### **Free Tier:**
- $5 free credits for new accounts
- Expires after 3 months
- Good for testing (~5,000 messages)

### **Paid Tier:**
- Pay as you go
- No monthly fee
- Only pay for what you use
- Set usage limits in OpenAI dashboard

**💡 Recommendation:**
1. Start with free credits
2. Set a usage limit ($10/month)
3. Monitor usage in OpenAI dashboard

---

## 🎯 What Changed from Groq?

| Aspect | Groq (Old) | OpenAI (New) |
|--------|-----------|--------------|
| **Provider** | Groq | OpenAI |
| **Model** | Llama 3.1 70B | GPT-3.5-Turbo |
| **Speed** | Very Fast | Fast |
| **Cost** | Free | Pay per use |
| **Quality** | Excellent | Excellent |
| **Config File** | `/src/config/grok.ts` | `/src/config/openai.ts` |

---

## 📝 Files Modified

### **Created:**
- ✅ `/src/config/openai.ts` - OpenAI configuration
- ✅ `/OPENAI_SETUP.md` - This guide

### **Modified:**
- ✅ `/src/app/components/CampusAssistant.tsx` - Uses OpenAI now
- Updated imports
- Changed error messages
- Updated UI text

### **Can Delete (Optional):**
- `/src/config/grok.ts` - Old Groq config
- `/GROQ_API_SETUP.md` - Old Groq guide

---

## ✅ Checklist

- [ ] Created OpenAI account
- [ ] Generated API key
- [ ] Copied API key to `/src/config/openai.ts`
- [ ] Saved the file
- [ ] Refreshed the app
- [ ] Tested Campus Assistant
- [ ] AI responds correctly ✨

---

## 🎊 You're All Set!

Your Campus Assistant now uses **OpenAI GPT-3.5-Turbo**!

**Next Steps:**
1. ✅ Add your API key (Step 2 above)
2. ✅ Test the assistant
3. ✅ Monitor usage on OpenAI dashboard
4. ✅ Enjoy AI-powered campus help! 🎓

---

## 📞 Support Links

- **OpenAI Platform:** https://platform.openai.com/
- **API Keys:** https://platform.openai.com/api-keys
- **Usage Dashboard:** https://platform.openai.com/usage
- **Pricing:** https://openai.com/pricing
- **Documentation:** https://platform.openai.com/docs
- **Status Page:** https://status.openai.com/

---

**🔑 Don't forget to add your API key in `/src/config/openai.ts`!**

*Last Updated: December 25, 2024*
