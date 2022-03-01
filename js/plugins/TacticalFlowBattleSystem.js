Scene_Battle.prototype.createMessageWindow = function() {
    this._messageWindow = new Window_Message();
    this.addWindow(this._messageWindow);
    
    this._messageWindow.subWindows().forEach(function(window) {
        this.addWindow(window);
    }, this);
};

BattleManager.displayStartMessages = function() {
    $gameTroop.enemyNames().forEach(function(name) {
        $gameMessage.setPositionType(1)
        $gameMessage.add(TextManager.emerge.format(name));
    });
    if (this._preemptive) {
        $gameMessage.add(TextManager.preemptive.format($gameParty.name()));
    } else if (this._surprise) {
        $gameMessage.add(TextManager.surprise.format($gameParty.name()));
    }
};


Sprite_Actor.prototype.moveToStartPosition = function() {
    this.startMove(0, 300, 0);
};

Sprite_Actor.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    var changed = (battler !== this._actor);
    if (changed) {
        this._actor = battler;
        if (battler) {
            this.setHeroPos(battler.index());
        }
        this.startEntryMotion();
        this._stateSprite.setup(battler);
    }
};

Sprite_Actor.prototype.setHeroPos = function(index) {
    var partySize = $gameParty.size();
    var boxWidth = Graphics.boxWidth
    
    var x = boxWidth/(partySize+1) + index*(boxWidth/(partySize+1));
    var y = 740;
    this.setHome(x, y);
};

Sprite_Actor.prototype.stepForward = function() {
    this.startMove(0, -48, 12);
};

Sprite_Actor.prototype.stepBack = function() {
    this.startMove(0, 0, 12);
};