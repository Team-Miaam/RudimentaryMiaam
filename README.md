
![image](https://user-images.githubusercontent.com/31593633/136675370-aa60a73c-cb45-4a4d-a11b-7acf91809590.png)

A Web Game Framework

# JS Game Framework (2021)

A lightweight, scene-based 2D game framework built with JavaScript. It features a singleton game manager, state-based animations, tiled map support, and an entity-component style architecture.

---

## 🚀 Getting Started

### 1. Initialize the Engine
The framework uses a singleton `GameManager` to manage the game window and the underlying application context.

```javascript
const manager = GameManager.instance;
manager.createWindow({ width: 800, height: 600 });
```

### 2. Create a Scene
Scenes manage the lifecycle of your game levels. Extend the Scene class and implement the lifecycle methods to get started.
```javascript
class MainMenu extends Scene {
    onStart() {
        console.log("Scene Started!");
    }

    onUpdate(delta) {
        // Game logic goes here (runs every frame)
    }
}
```

## 🏗 Core Architecture

### 1. Scene & Entity System
The framework is built around Scenes which contain Entities. Entities represent dynamic objects like players, enemies, or items.
* Scene: Manages the onStart, onUpdate, and onDestroy lifecycle. It handles asset preloading for all contained entities.
* Entity: The base class for all dynamic components. It includes a transform and handles asset loading via the static Load() method.

### 2. Rendering & World (View)
The visual world is organized into a View, which acts as a container for various Layer types.
* TileLayer: Renders tile-based maps from texture data.
* ObjectGroup: Handles groups of objects within the map.
* Camera: Attached to a scene to follow and center over entities (e.g., camera.follow(player)).

### 3. Animation
Use AnimatedSpriteWState for complex characters. It allows you to map animations to specific states (e.g., "idle", "walk", "attack") and generate functional textures dynamically.

## ⌨️ Input Management
The framework provides an action-oriented keyboard system to bind logic to key presses.
```javascript
const spaceKey = Keyboard.key(" ");
spaceKey.addActionOnDown("jump", () => {
    player.jump();
});
```

## 📜 Technical Notes (2021)
* Singleton Pattern: The GameManager must be accessed via .instance.

* Lifecycle: Always ensure super.onStart() or relevant lifecycle calls are made if overriding core methods to ensure assets load correctly.

* Map Data: View and Layer classes are designed to handle JSON format map data, specifically compatible with Tiled-style exports.
