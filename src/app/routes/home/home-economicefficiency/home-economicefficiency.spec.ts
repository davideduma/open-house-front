import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { MatCardModule } from '@angular/material/card';
import { HomeEconomicefficiencyComponent } from './home-economicefficiency.component';

describe('PersonalInfoComponent', () => {
    let component: HomeEconomicefficiencyComponent;
    let fixture: ComponentFixture<HomeEconomicefficiencyComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ HomeEconomicefficiencyComponent ],
        imports: [
        RouterTestingModule,
        MatCardModule,
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeEconomicefficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });

    // Component
    it('[L2] - debe inicializar correctamente los arrays anios y aniosFiltrados', () => {
        expect(component.anios.length).toBe(component.datosEficiencia.length);
        expect(component.aniosFiltrados.length).toBe(component.datosEficiencia.length);
    });

    it('[L2] - debe filtrar correctamente por un año especifico', () => {
        const yearToTest = 2022;
        component.filtrarPorAnio({target: {value: yearToTest.toString()}} as unknown as Event);
        expect(component.aniosFiltrados.every(dato => dato.anio === yearToTest)).toBeTruthy();
    });

    it('[L2] - debe mostrar todos los datos cuando no se selecciona un año', () => {
        component.filtrarPorAnio({target: {value: ''}} as unknown as Event);
        expect(component.aniosFiltrados.length).toBe(component.datosEficiencia.length);
    });

    it('[L2] - debe actualizar aniosFiltrados cuando cambia la seleccion', () => {
        const initialLength = component.aniosFiltrados.length;
        component.filtrarPorAnio({target: {value: '2023'}} as unknown as Event);
        expect(component.aniosFiltrados.length).not.toBe(initialLength);
    });

    it('[L2] - debe mantener la integridad de los datos despues de aplicar un filtro', () => {
        component.filtrarPorAnio({target: {value: '2024'}} as unknown as Event);
        expect(component.aniosFiltrados.length).toBe(1);
        expect(component.aniosFiltrados[0].anio).toBe(2024);
        expect(component.aniosFiltrados[0].eficiencia).toBe('20%');
    });

    // HTML
    it('[L2] - debe existir un selector de año', () => {
        const selectElement = fixture.debugElement.query(By.css('select'));
        expect(selectElement).toBeTruthy();
    });

    it('[L2] - debe tener el numero correcto de opciones de año', () => {
        const selectElement = fixture.debugElement.query(By.css('select'));
        const options = selectElement.queryAll(By.css('option'));
        expect(options.length).toBe(component.anios.length + 1);
    });

    it('[L2] - debe renderizar todas las filas iniciales en la tabla', () => {
        const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
        expect(rows.length).toBe(component.datosEficiencia.length);
    });

    it('[L2] - debe mostrar solo los datos del año seleccionado', () => {
        component.filtrarPorAnio({target: {value: '2022'}} as unknown as Event);
        fixture.detectChanges();
        const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
        const filteredData = component.datosEficiencia.filter(dato => dato.anio === 2022);
        expect(rows.length).toBe(filteredData.length);
    });

    it('[L2] - debe mostrar todos los datos cuando se selecciona la opcion por defecto', () => {
        component.filtrarPorAnio({target: {value: ''}} as unknown as Event);
        fixture.detectChanges();
        const rows = fixture.debugElement.queryAll(By.css('table tbody tr'));
        expect(rows.length).toBe(component.datosEficiencia.length);
    });

    // SCSS

    it('debe aplicar el color de fondo correcto a las filas impares', () => {
        const oddRow: HTMLElement = fixture.nativeElement.querySelectorAll('table tbody tr:nth-child(odd)')[0];
        expect(window.getComputedStyle(oddRow).backgroundColor).toBe('rgb(0, 60, 112)');
    });

    it('debe tener el color de texto y fondo esperado en las cabeceras de la tabla', () => {
        const thElement: HTMLElement = fixture.nativeElement.querySelector('table thead tr th');
        expect(window.getComputedStyle(thElement).color).toBe('rgb(255, 255, 255)');
    });

});
