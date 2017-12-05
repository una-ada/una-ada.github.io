# Calculations & Error Propagation

The moment of inertia for a cylinder (a rod $R$ whose thickness is not negligible) is given by the equation<sup>[1](#n1)</sup>
$$
I_R=m\left(\frac{r^2}{4}+\frac{t^2}{12}\right),\tag{1}
$$
where $m$ is the mass of the cylinder, $r$ is the radius of the cylinder, and $t$ is half the length of the cylinder. In this specific case $m=0.030\pm0.0001kg$, $r=0.002\pm0.001m$, and $t=0.300\pm0.001m$. This yields a resulting moment of inertia of
$$
\begin{align}
I_R&=0.030\left(\frac{0.002^2}{4}+\frac{0.300^2}{12}\right)\tag{2a}\\
&=2.2503*10^{-4}kgm^2,\tag{2b}
\end{align}
$$
The error on equation $2b$ is then computed using the general equation for error propagation:
$$
\sigma_f^2=\sum_i\left(\frac{\partial f}{\partial x_i}\right)^2\sigma^2_{x_i},\tag{3}
$$
such that
$$
\begin{align}
\sigma_{I_R}^2 &= \left(\frac{\partial I_R}{\partial m}\right)^2\sigma^2_m + \left(\frac{\partial I_R}{\partial r}\right)^2\sigma^2_r + \left(\frac{\partial I_R}{\partial t}\right)^2\sigma^2_t\tag{4a}\\
&=\left(\frac{r^2}{4}+\frac{t^2}{12}\right)^2\sigma^2_m + \left(\frac{mr}{2}\right)^2\sigma^2_r + \left(\frac{mt}{6}\right)^2\sigma^2_t\tag{4b}\\
&=\left(\frac{0.002^2}{4}+\frac{0.30^2}{12}\right)^20.0001^2 + \left(\frac{0.030(0.002)}{2}\right)^20.001^2 + \left(\frac{0.030(0.300)}{6}\right)^20.001^2\tag{4c}\\
&=2.81355...*10^{-12}kg^2m^4\tag{4d}\\
\sigma_{I_R}&=\sqrt{2.81355...*10^{-12}}\tag{4e}\\
&=1.67736...*10^{-6}kgm^2.\tag{4f}
\end{align}
$$
The combination of equations $2b$ and $4f$ gives a reported value for $I_R$ as
$$
I_R=(2.250\pm0.017)*10^{-4}kgm^2.\tag{5}
$$

<a name="n1">1</a>: http://hyperphysics.phy-astr.gsu.edu/hbase/icyl.html#icyl