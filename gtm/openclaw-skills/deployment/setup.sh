#!/bin/bash
# GTM Agent Fleet Setup Script
# Usage: ./setup.sh [server_ip]

set -e

SERVER_IP=${1:-"localhost"}
WORKSPACE="/root/clawd"
CONFIG_DIR="/root/.clawdbot"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  GTM Agent Fleet Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if running locally or on remote
if [ "$SERVER_IP" = "localhost" ]; then
    CMD=""
    echo "Running locally..."
else
    CMD="ssh root@$SERVER_IP"
    echo "Deploying to $SERVER_IP..."
fi

echo ""
echo "1. Creating workspace directories..."
$CMD "mkdir -p $WORKSPACE/memory"

echo "2. Copying agent skill files..."
for agent in scout writer rep closer; do
    if [ -f "../$agent/SKILL.md" ]; then
        if [ "$SERVER_IP" = "localhost" ]; then
            cp "../$agent/SKILL.md" "$WORKSPACE/$(echo $agent | tr '[:lower:]' '[:upper:]').md"
        else
            scp "../$agent/SKILL.md" "root@$SERVER_IP:$WORKSPACE/$(echo $agent | tr '[:lower:]' '[:upper:]').md"
        fi
        echo "   ✓ $agent"
    fi
done

# Copy Mission Control
if [ -f "../mission-control/SKILL.md" ]; then
    if [ "$SERVER_IP" = "localhost" ]; then
        cp "../mission-control/SKILL.md" "$WORKSPACE/MISSION-CONTROL.md"
    else
        scp "../mission-control/SKILL.md" "root@$SERVER_IP:$WORKSPACE/MISSION-CONTROL.md"
    fi
    echo "   ✓ mission-control"
fi

echo "3. Copying workspace files..."
for file in MEMORY.md HEARTBEAT.md WORKING.md PROGRESS.md; do
    if [ -f "$file" ]; then
        if [ "$SERVER_IP" = "localhost" ]; then
            cp "$file" "$WORKSPACE/$file"
        else
            scp "$file" "root@$SERVER_IP:$WORKSPACE/$file"
        fi
        echo "   ✓ $file"
    fi
done

echo "4. Copying strategy files..."
for file in STRATEGY-*.md; do
    if [ -f "$file" ]; then
        if [ "$SERVER_IP" = "localhost" ]; then
            cp "$file" "$WORKSPACE/$file"
        else
            scp "$file" "root@$SERVER_IP:$WORKSPACE/$file"
        fi
        echo "   ✓ $file"
    fi
done

echo "5. Setting up cron jobs..."
if [ "$SERVER_IP" = "localhost" ]; then
    CRON_CMD="npx clawdbot"
else
    CRON_CMD="ssh root@$SERVER_IP npx clawdbot"
fi

# Mission Control
$CRON_CMD cron add \
  --name "mission-control-heartbeat" \
  --description "Mission Control fleet management" \
  --cron "0,30 * * * *" \
  --session "isolated" \
  --model "sonnet" \
  --message "You are Mission Control. Read MISSION-CONTROL.md for your role and HEARTBEAT.md for your checklist. Check WORKING.md and PROGRESS.md. Coordinate the fleet or reply HEARTBEAT_OK if nothing to do." \
  2>/dev/null || echo "   (cron may already exist)"
echo "   ✓ mission-control-heartbeat"

# Scout
$CRON_CMD cron add \
  --name "scout-heartbeat" \
  --description "Scout research agent" \
  --cron "0,15,30,45 * * * *" \
  --session "isolated" \
  --model "haiku" \
  --message "You are Scout. Read SCOUT.md for your personality, STRATEGY-SCOUT.md for your playbook, and HEARTBEAT.md for your checklist. Check WORKING.md for pipeline state. Research prospects or reply HEARTBEAT_OK if nothing to do." \
  2>/dev/null || echo "   (cron may already exist)"
echo "   ✓ scout-heartbeat"

# Writer
$CRON_CMD cron add \
  --name "writer-heartbeat" \
  --description "Writer copy agent" \
  --cron "2,17,32,47 * * * *" \
  --session "isolated" \
  --model "haiku" \
  --message "You are Writer. Read WRITER.md for your personality, STRATEGY-WRITER.md for your playbook, and HEARTBEAT.md for your checklist. Check WORKING.md for briefings from Scout. Draft copy or reply HEARTBEAT_OK if nothing to do." \
  2>/dev/null || echo "   (cron may already exist)"
echo "   ✓ writer-heartbeat"

# Rep
$CRON_CMD cron add \
  --name "rep-heartbeat" \
  --description "Rep outreach agent" \
  --cron "4,19,34,49 * * * *" \
  --session "isolated" \
  --model "haiku" \
  --message "You are Rep. Read REP.md for your personality, STRATEGY-REP.md for your playbook, and HEARTBEAT.md for your checklist. Check WORKING.md for copy from Writer. Execute outreach or reply HEARTBEAT_OK if nothing to do." \
  2>/dev/null || echo "   (cron may already exist)"
echo "   ✓ rep-heartbeat"

# Closer
$CRON_CMD cron add \
  --name "closer-heartbeat" \
  --description "Closer deals agent" \
  --cron "6,21,36,51 * * * *" \
  --session "isolated" \
  --model "haiku" \
  --message "You are Closer. Read CLOSER.md for your personality, STRATEGY-CLOSER.md for your playbook, and HEARTBEAT.md for your checklist. Check WORKING.md for qualified deals. Close deals or reply HEARTBEAT_OK if nothing to do." \
  2>/dev/null || echo "   (cron may already exist)"
echo "   ✓ closer-heartbeat"

# Daily Standup
$CRON_CMD cron add \
  --name "daily-standup" \
  --description "Daily standup report" \
  --cron "30 23 * * *" \
  --session "isolated" \
  --model "sonnet" \
  --deliver \
  --message "Generate daily standup. Read WORKING.md, PROGRESS.md, and today's memory/YYYY-MM-DD.md. Compile: completed today, in progress, blocked, metrics, items needing human attention. Format per MISSION-CONTROL.md standup template." \
  2>/dev/null || echo "   (cron may already exist)"
echo "   ✓ daily-standup"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Setup Complete!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Edit config: $CONFIG_DIR/clawdbot.json"
echo "2. Set API keys: ANTHROPIC_API_KEY, HUBSPOT_API_KEY"
echo "3. Start gateway: clawdbot gateway start"
echo "4. Verify crons: clawdbot cron list"
echo ""
echo "Agents will begin heartbeats automatically."
