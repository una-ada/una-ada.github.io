---
title: 2D Schrödinger Equation Simulation
---

# 2D Schrödinger Equation Simulation

A month or two ago I had this idea to attempt to create a visualization of [quantum tunneling](https://en.wikipedia.org/wiki/Quantum_tunnelling) in two dimensions.
Obviously it wouldn't be the equation itself, but rather a solution to it for a particular case that I would be using.
Here, the $x$ and $y$ would be the actual $x$ and $y$ coordinate grid used for the solution, but $z$ would be the [probability density](https://www.khanacademy.org/math/statistics-probability/random-variables-stats-library/random-variables-continuous/v/probability-density-functions).

* toc
{:toc}

## Rendering Setup

The immediate problem one runs into when attempting something along these lines is how to properly create the visualization, that is, how to build a 3D object that properly represents what is intended.
My initial thought was to just create a [`THREE.Mesh`](https://threejs.org/docs/#api/objects/Mesh) object.
As a test, I was using the function $sin(\sqrt{x^2+y^2})-t)$, where $t$ is some arbitrarily defined time-dependent value.
In theory, this would create a sort of outward going wave shape that would move with time.
Using the `THREE.Mesh`, however, this attempt suffered from extreme lag, flooding the console with warnings about render times far exceeding what would be expected for 60fps.

Eventually, I did come across the idea of a [`THREE.ParametricGeometry`](https://threejs.org/docs/#api/geometries/ParametricGeometry), which increased the efficiency enough to at least be able to render a low-poly ($600$ points) animation of the aforementioned sample function:

<iframe src="/js/3/sinusoid.html" style="border:0;outline:0;width:100%;height:300px;">
</iframe>

The proper rendering of this function, of course, requires the understanding that the two input variables (`u` and `v`) are iterated up to a specified number (here `30`) from $0$ by integer values.
This may be useful for further consideration when attempting to render other functions, in this case it merely required the movement of what would normally have been rendered as $y=0, x=0$ as $y=15, x=15$ as determined by the upper limit of $30$.
This is shown for the above example in the following code for the parametric function:

```javascript
var	func		= (u,v)=>{
        return new THREE.Vector3(
            (u-0.5)*64,
            Math.sin(((((u-0.5)**2 + (v-0.5)**2)**0.5)
                -((tick/128)%Math.PI))*16)*2,
            (v-0.5)*64
        )
    },
    geometry	= new THREE.ParametricGeometry(func,30,30),
    material	= new THREE.MeshLambertMaterial({
        color   : 0x555555,
        side    : THREE.DoubleSide
    }),
    graph		= new THREE.Mesh(geometry,material);
scene.add(graph);
```

## The Schrödinger Equation

To start developing a simulation for a solution to the Schrödinger Equation, I first need to define and simplify it in such a way that it can eventually be turned in to an algorithm.
[Jake VanderPlas](https://twitter.com/jakevdp) wrote [a blog post](https://jakevdp.github.io/blog/2012/09/05/quantum-python/) that covers a similar topic: a 1D simulation of the Schrödinger Equation in Python.
The majority of this section is going to be heavily based on his post, but eventually there will be some massive deviations just based on the complications of moving from one to two dimensions.
Another consideration is the difference between Python and JavaScript in the treatment of math systems, specifically in how [Python libraries treat arrays](http://www.scipy-lectures.org/intro/numpy/operations.html).
In an attempt to remedy this, I turned to [Math.js](http://mathjs.org/).
Now, the Time-Dependent Schrödinger Equation (TDSE) in 1D is defined as:

$$i\hbar\frac{\partial \Psi}{\partial t} = \frac{-\hbar^2}{2m} \frac{\partial^2 \Psi}{\partial x^2} + V(x) \Psi,\tag1 \\$$

where $i$ is the imaginary unit, $\hbar$ is [reduced Planck constant](https://en.wikipedia.org/wiki/Planck_constant), $\Psi$ is the probability distribution function for a particle (VanderPlas used $\psi$ for this, but I'm using the notation I'm more accustomed to), $m$ is the mass of the particle, $x$ is the coordinate along the 1D $x$-axis, and $V(x)$ is the potential energy of the system.
Differential equations aren't really something that I can just plug in to a library and solve, apparently, at least not in this case.
As such, I have to reduce it down to some numerical solution algorithm.

VanderPlas proposes the usage of [Fourier Transforms](http://www.thefouriertransform.com/) for this, as it is a typical approach for numerically solving differential equations.
He uses a convention of $\psi(x,t)$ for the Schrodinger Equation and $\widetilde{\psi}(k,t)$ for its Fourier Transform; however, I'll be sticking to my convention of $\Psi(x,t)$ and $A(k,t)$ respectively.
Using this notation, the Fourier Transform of the Schrödinger Equation is defined as:

$$A(k,t) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty} \Psi(x,t) e^{-ikx} dx,\tag2 \\$$

and the Inverse Fourier Transform as:

$$\Psi(x,t) = \frac{1}{\sqrt{2\pi}}\int_{-\infty}^{\infty} A(k,t) e^{ikx} dx.\tag3 \\$$

For the sake of my ego, I would like to say that I could totally do all this math on my own, but I'm extremely tired and don't want to bother with doing the annoying math that comes with just about everything surrounding quantum mechanics.
With that out of the way, I'm just going to steal the next few lines from VanderPlas again.
First, the substitution of equation $(2)$ into equation $(1)$:

$$i\hbar\frac{\partial A}{\partial t} = \frac{\hbar^2 k^2}{2m} A + V(x)(i\frac{\partial}{\partial k})A.\tag4 \\$$

From there we go on to solve portions of these equations, if you've done any quantum mechanics this might look a bit familiar as the time-dependency of the solution to the TDSE is fairly universal.
These are the forms of solutions for some small time step $\Delta t$ in the $x$- and $k$-space respectively:

$$\begin{eq1}
\Psi(x, t + \Delta t) = \Psi(x, t) e^{-i V(x) \Delta t / \hbar},\tag5 \\
A(k, t + \Delta t) = A(k, t) e^{-i \hbar k^2 \Delta t / 2m}.\tag6 \\
\end{eq1}$$

## Fast Fourier Transforms
