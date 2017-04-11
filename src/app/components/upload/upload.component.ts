import { trigger, state, style, transition, animate } from '@angular/animations';

import { Component, OnInit }         from '@angular/core';
import { ActivatedRoute }            from '@angular/router';
import { Location }                  from '@angular/common';

import { HttpService, ToastService } from '../../services';

let index = 0;

@Component({
    selector: 'upload',
    templateUrl: 'upload.component.html',
    styleUrls: ['upload.component.scss'],
    animations: [
        trigger('upload', [
            state('in', style({ opacity: '1' })),
            transition('void => *', [
                style({ opacity: '0' }),
                animate(200)
            ]),
            transition('* => void', [
                animate(300, style({ opacity: '0' }))
            ])
        ])
    ]
})
export class UploadComponent implements OnInit {
    albums: any[];
    title: string;
    uploadUrl: string;
    images = [];
    onDrag = false;
    constructor(private location: Location,
        private route: ActivatedRoute,
        private httpService: HttpService,
        public toastService: ToastService) { }

    ngOnInit(): void {
        this.getAlbums();
    }
    getAlbums(): void {
        this.httpService
            .getAlbums()
            .then(res => {
                this.albums = res;
            })
            .catch(error => this.toastService.showError(error));
    }
    getUploadUrl(albumId: string): void {
        this.httpService
            .getUploadUrl(albumId)
            .then(res => {
                this.uploadUrl = res.upload_url;
            })
            .catch(error => this.toastService.showError(error));
    }
    handleDragEnter(e: DragEvent): void {
        this.onDrag = true;
    }
    handleDragLeave(e: DragEvent): void {
        this.onDrag = false;
    }
    handleDrop(e: DragEvent): void {
        e.preventDefault();
        this.checkFileType(e);
        this.onDrag = false;
    }
    checkFileType(e: any): void {
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        const pattern = /image-*/;
        for (let i = 0; i < files.length; i++) {
            if (!files[i].type.match(pattern)) {
                alert('invalid format');
                return;
            }
        }
        this.getImgData(files);
    }
    getImgData(files: FileList): void {
        for (let i = 0; i < files.length; i++) {
            let img: any = {};
            let reader = new FileReader();

            reader.readAsDataURL(files[i]);
            reader.onloadend = () => {
                img.src = reader.result;
                img.name = files[i].name;
                img.size = files[i].size;
                img.success = false;
                img.progress = 0;
                this.images.push(img);

                ((j) => setTimeout(() => {
                    this.upload(img.src, img.name, index);
                    index++;
                }, 400 * i))(index);
            };
        }
    }
    upload(img: string, name: string, idx: number): void {
        this.images[idx].progress = 40;
        this.httpService
            .upload(this.uploadUrl, img, name)
            .then(res => {
                this.save(res, idx);
                this.images[idx].progress = 60;
            })
            .catch(error => this.toastService.showError(error));
    }
    save(response: Response, idx: number): void {
        this.images[idx].progress = 80;
        this.httpService
            .save(response)
            .then(res => {
                this.images[idx].progress = 100;
                this.images[idx].success = true;
            })
            .catch(error => this.toastService.showError(error));
    }
    clearDropZone(): void {
        this.images = [];
        index = 0;
    }
    goBack(): void {
        this.location.back();
    }
}
