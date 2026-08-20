import CodeCanvas from "../../components/CodeCanvas";

const Prueba = () => {

  return (
    <>
      <h1 className="bg-amber-400">Etiquetas HTML</h1>
      
      <h2 className="bg-amber-500">Etiquetas en Head</h2>
      <h3 className="bg-amber-600">Title,meta</h3>
      <CodeCanvas contenido={`
      <title>Aprendiendo HTML</title>
      <meta name="description" content="En esta una página ">
      <link rel="apple-touch-icon" href="img/favicon.png">      
      `}></CodeCanvas>

      <h2 className="bg-amber-500">Etiquetas en body</h2>
      <h3 className="bg-amber-600">Etiquetas parrafo, h1-h6,br,hr</h3>
      <CodeCanvas contenido={`
      <p>Hola, escribiendo mi primer documento HTML</p>
      <h1>Temario del Curso</h1>
      <h2>Temario del Curso</h2>
      <h3>Temario del Curso</h3>
      <h4>Temario del Curso</h4>
      <h5>Temario del Curso</h5>
      <h6>Temario del Curso</h6>
      <br>
      <hr>
      `}></CodeCanvas>

      <h3 className="bg-amber-600">Etiquetas a,ul,li</h3>
      <CodeCanvas contenido={`
      <a href="/index.html">Back</a>
      <ul>
        <li><a href="index.html#encabezados">Encabezados HTML</a></li>
        <li><a href="index.html#textos-basicos">Etiquetas de Texto Básicas</a></li>
      </ul>
      `}></CodeCanvas>

      <h3 className="bg-amber-600">b,i,mark, small, strogn, em, blockquote, cite</h3>
      <CodeCanvas contenido={`
      <p>
        Palabras en: <b>negrita</b>, <i>itálica</i>, <u>subrayado</u>, e=mc<sup>2</sup>, H<sub>2</sub>O,
        <mark>marca texto</mark> <small>letras pequeñas</small>
        <strong>Este texto es importante</strong>. <em>Este texto hace énfasis</em>.
      </p>
      <blockquote>Yo sólo sé, que no se nada</blockquote>
      <cite>Sócrates</cite>
      `}></CodeCanvas>

      <h3 className="bg-amber-600">pre y code</h3>
      <CodeCanvas contenido={`
      <pre>
        Tareas por hacer:
        - HTML
          - Terminar de grabar las secciones de este curso.
          - Editar en un sólo Video
        - CSS
          - Comenzar a grabar secciones CSS
          - Editar en un sólo Video
      </pre>
      <p>
        <code>Este texto está en formato de código</code>
      </p>
      `}></CodeCanvas>

      <h3 className="bg-amber-600">div, header, main, footer, nav, article, aside, section y addres</h3>
      <CodeCanvas contenido={`
      <div>div - Es una etiqueta contenedora que no tiene semántica</div>
      <header>header - Cabecera de un sitio web o de una sección</header>
      <main>
        main - Define la sección principal del documento, sólo puede existir una
        etiqueta main por documento
      </main>
      <footer>footer - Pié de página de un sitio web o de una sección</footer>
      <nav>nav - Representa una navegación</nav>
      <article>
        article - Representa una sección autocontenido (que por sí sola se
        explica)
      </article>
      <aside>aside - Representa contenido complementario o secundario</aside>
      <section>section - Representa una sección de contenido genérico</section>
      <address>address - Representa una información de contacto</address>
      `}></CodeCanvas>

      <h3 className="bg-amber-600">span, figure, img</h3>
      <CodeCanvas contenido={`
      <span>Hola soy otra span</span>
      <figure>
        <img src="img/periodic-table-of-html-elements.png" alt="Tabla de los Elementos HTML">
        <figcaption>Tabla de los Elementos HTML</figcaption>
      </figure>
      `}></CodeCanvas>

      <h3 className="bg-amber-600">form</h3>
      <CodeCanvas contenido={`
      <form action="https://formsubmit.co/your@email.com" method="POST">
        <input type="text" name="nombre" placeholder="Escribe tu nombre" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
          title="Nombre sólo acepta letras y espacios en blanco" required>
        <br>
        <input type="email" name="correo" placeholder="Escribe tu correo" pattern="^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$"
          title="Formato de correo inválido" required>
        <br>
        <textarea name="comentarios" cols="30" rows="10" required></textarea>
        <br>
        <label>
          <input type="checkbox" name="terminos" required>
          ¿Aceptas términos y condiciones?
        </label>
        <select name="idioma" required>
          <option value="" selected>Elige una opción</option>
          <option value="es">Español</option>
          <option value="en">Inglés</option>
          <option value="fr">Francés</option>
          <option value="it">Italiano</option>
          <option value="pt">Portugués</option>
        </select>  
        <input type="submit">
      </form>
      <textarea cols="50" rows="5"></textarea>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/F55LNTW3GE0" title="YouTube video player"
      frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen></iframe>
      <audio src="media/Feels-PatrickPatrikios.mp3" controls preload></audio>
      <video src="media/kenai.mp4" controls preload poster="img/puesta-sol.jpg"></video>
      <dialog open>
        Esto es una ventana modal en HTML
      </dialog>
      <details open>
        <summary>Título del Acordeón</summary>
        <article>
          <h3>Contenido del Acordeón</h3>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, culpa. Eos odio omnis sit illum magnam eum
            voluptates earum numquam! Deleniti vitae illum alias sequi aspernatur magnam quo quaerat reiciendis.</p>
          <img src="img/puesta-sol.jpg" alt="Puesta de sol">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, culpa. Eos odio omnis sit illum magnam eum
            voluptates earum numquam! Deleniti vitae illum alias sequi aspernatur magnam quo quaerat reiciendis.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, culpa. Eos odio omnis sit illum magnam eum
            voluptates earum numquam! Deleniti vitae illum alias sequi aspernatur magnam quo quaerat reiciendis.</p>
        </article>
      </details>
      `}></CodeCanvas>

      <h3 className="bg-amber-600">table</h3>
      <CodeCanvas contenido={`
      <table>
        <thead>
          <tr>
            <th colspan="3">Tabla de los Santos de Athena</th>
          </tr>
          <tr>
            <th>Nombre</th>
            <th>Constelación</th>
            <th>Tipo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ikki</td>
            <td>Fénix</td>
            <td>Bronce</td>
          </tr>
          <tr>
            <td>Mistry</td>
            <td>Lagarto</td>
            <td>Plata</td>
          </tr>
          <tr>
            <td>Saga</td>
            <td>Géminis</td>
            <td>Dorado</td>
          </tr>
          <tr>
            <td>Shaina</td>
            <td rowspan="2">Ofiuco</td>
            <td>Plata</td>
          </tr>
          <tr>
            <td>Odiseo</td>
            <td>Dorado</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th colspan="3"><small>Saint Seiya fue creado por Masami Kurumada</small></th>
          </tr>
        </tfoot>
      </table>
      `}></CodeCanvas>
    </>

  );
};

export default Prueba;