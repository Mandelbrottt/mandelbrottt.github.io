---
name: Planetar / NextCore
tools: [C++, NextAPI2022]
image: /assets/planetar-splash.png
description: An engine wrapping the Ubisoft Toronto Next 2022 Programming API that features 3D software rendering, an entity component system, reflection, and a number of other systems. Written entirely in C++.
---

{% include elements/video.html id="ua-5DCOgYWU" %}

**Planetar** is a game that was written as part of the Ubisoft Toronto 2022 NEXT programming challenge. The prompt was to take inspiration from the classic arcade game [Atari Gravitar](https://en.wikipedia.org/wiki/Gravitar) and add your own spin on it. In my case, the spin was that the game was moved into 3D!

----

Major Engine Features:

- Software 3D Renderer
- Entity Component-esque System
- Reflection ([What is Reflection?](https://en.wikipedia.org/wiki/Reflective_programming))

The engine used to make the game, dubbed "NextCore" has a number of interesting features under the hood. NextAPI2022 only has support for simple sprites, and so NextCore built a software 3D renderer on top of the simple sprite system. 

One of the major pillars of NextCore is its reflection system, where types that are registered with the reflection system can be introspected. That is, information on their data members can be queried at runtime, and objects can also be constructed in a type agnostic-way using strings and type references. 

NextCore also has an entity component system that uses pool allocators to store components. The entity component system is tightly integrated with the reflection system, and so you can store types at runtime and add, get, remove, or otherwise modify components without knowing their type at compile time.

NextCore doesn't have smart pointers or reference counting, as users can store raw pointers to components. Reflection allows NextCore view member types at runtime, and automatically update pointers when components' are moved around in memory, making working with pointers and references super easy for users.

<p class="text-center">
    {% include elements/button.html link="https://github.com/Mandelbrottt/Ubisoft-Next-Submission-2022" text="Check it out on Github!" %}
</p>
