import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { apiPostCalculo } from "../../api/apiPartidos";

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const MySwal = withReactContent(Swal);

export const contextActions =
(form) => {
    MySwal.fire({
      title: `Estas seguro?`,
      icon: "warning",
      text: `Se hara el calculo de los punteos`,
      showConfirmButton: true,
      confirmButtonText: "Confirmar",
      confirmButtonColor: "#3085d6",
      showCancelButton: true,
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          title: `Espera un momento!`,
          icon: "info",
          backdrop: false,
          didOpen: () => {
            MySwal.showLoading();
            setTimeout(async () => {
              const response = await apiPostCalculo(form);
              MySwal.hideLoading();
              if (response.exito != 0) {
                MySwal.fire(
                  `Calculos realizados con exito`,
                  "",
                  "success"
                );
              } else {
                MySwal.fire(`error al realizar calculos`, "", "error");
              }
            }, 1500);
          },
        });
      }
    });
};