<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'fourth' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         'wD%*q@*0n=1#k8`A8Ze[i3a(fF~q|kTiqC.Iy,M*gLn/=wG$tz;Pt3?dm,?wv#&1' );
define( 'SECURE_AUTH_KEY',  ']h-Uyp.~nG#>~4[<uI2*#yu7l6A4o0~jVRH~nI&$D)FR&EJ;y#-Nj&+scxI]|^Bq' );
define( 'LOGGED_IN_KEY',    'v>k.cIWH1F=MQK7MsOvF{wnH*00G_/z#2j_60|}XtPSAdK <-mU?qQ5^RO|K0[Oa' );
define( 'NONCE_KEY',        '~M<_059B;)V%9>XZ3X<H,?+#d3qL)pvtQ.;_}:f2X?nL>$u%20^[iaHrNK:kgj-[' );
define( 'AUTH_SALT',        'A@ctKW!GVkwnjhE7.=c$K.hbt4tS(fnq&NRk:-V0?f@@HkL[eti:qH2CC)I:]<C|' );
define( 'SECURE_AUTH_SALT', 'Gs[n|gX414H_2Z>G9T,-EOt_=7&M]jlbVhI3F6~HJNq5iq9T^61N4Z1Z(sw>@.;k' );
define( 'LOGGED_IN_SALT',   'k!Dg_jOtP_=Q. 3U$n{pE+@rgGx/K&smS2qseS+G@I vw+yw{40J9jwtquJMbtjt' );
define( 'NONCE_SALT',       'O+w{.!;DWfmD)[%GA%gu9e>sgXjhlV9xsIQo?f)%QVX48#qMrqoUj{?)pZoL+6YK' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
