# Cómo actualizar el contenido del Playbook

Este documento explica cómo actualizar el contenido del Playbook Comercial de Agua Siembra sin necesidad de conocimientos técnicos de programación.

---

## Dónde vive el contenido

Todo el texto del playbook está en la carpeta `/content/sections/`. Cada sección es un archivo `.md` (Markdown) independiente. Los archivos se nombran así:

```
s01-bienvenida.md          → Sección 1: Bienvenida
s02-que-es-agua-siembra.md → Sección 2: Qué es Agua Siembra
s03-ciclo-regenerativo.md  → Sección 3: El ciclo regenerativo
...
sa-glosario.md             → Anexo A: Glosario
sb-faq.md                  → Anexo B: FAQ
sc-datos-impacto.md        → Anexo C: Datos de impacto
sd-contactos.md            → Anexo D: Contactos internos
se-plantillas.md           → Anexo E: Plantillas
```

---

## Cómo editar una sección

1. Abre el archivo de la sección que quieres editar (por ejemplo, `sc-datos-impacto.md`).
2. Los primeros líneas (entre `---`) son metadatos que **no debes cambiar**:
   ```
   ---
   id: sc
   partId: ax
   n: "C"
   title: Datos de impacto actualizables
   ---
   ```
3. Todo lo que viene después de los `---` es el contenido editable.
4. Guarda el archivo.
5. El cambio se verá en la app la próxima vez que se haga un deploy (o en desarrollo, al instante).

---

## Formato del texto (Markdown básico)

El texto usa formato Markdown. Estas son las convenciones que necesitas saber:

| Lo que escribes | Lo que aparece |
|---|---|
| `**texto en negrita**` | **texto en negrita** |
| `## Título de sección` | Título de sección en mayúsculas pequeñas |
| `### Subtítulo` | Subtítulo destacado |
| `- ítem de lista` | • ítem de lista |
| `> Cita destacada` | Cita con borde verde a la izquierda |
| Línea en blanco | Nuevo párrafo |

---

## Ejemplo: actualizar los datos de impacto

El archivo más frecuentemente actualizado es `sc-datos-impacto.md`. Cuando cambien las cifras, busca la línea correspondiente y edítala:

```
- Árboles nativos sembrados a la fecha: **~32.000** en 34 bosques altoandinos
```

Cambia el número:

```
- Árboles nativos sembrados a la fecha: **~35.000** en 36 bosques altoandinos
```

No olvides actualizar la fecha al inicio de ese archivo:

```
> Última actualización: *[completar con fecha]*
```

---

## Ejemplo: agregar contactos internos

Abre `sd-contactos.md` y llena los campos:

```
- **Dirección comercial:** Juan Pérez — +57 312 000 0000 — juan@aguasiembra.co
```

---

## Secciones que NO debes editar directamente

- Los archivos en `/src/` son el código de la aplicación. Modificarlos requiere conocimientos técnicos.
- El archivo `globals.css` contiene los colores y tipografías de la marca.

---

## Después de editar: ¿cómo se publica?

Si el proyecto está en Vercel:
1. Sube los archivos modificados al repositorio (Git).
2. Vercel detecta el cambio automáticamente y hace el deploy en 1-2 minutos.
3. La URL pública se actualiza sola.

Si no tienes acceso a Git, envía el archivo modificado al desarrollador del equipo para que lo suba.

---

*¿Tienes dudas? Contacta al equipo técnico.*
